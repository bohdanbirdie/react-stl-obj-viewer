import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import STLLoaderModule from 'three-stl-loader'
import OrbitControlsModule from 'three-orbit-controls'
import {ScaleLoader} from 'react-spinners';

const STLLoader = STLLoaderModule(THREE);
const OrbitControls = OrbitControlsModule(THREE);

class STLViewer extends Component {
    static propTypes = {
        className: PropTypes.string,
        url: PropTypes.string,
        file: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
        backgroundColor: PropTypes.string,
        modelColor: PropTypes.string,
        sceneClassName: PropTypes.string,
        onSceneRendered: PropTypes.func,
    };

    static defaultProps = {
        backgroundColor: '#EAEAEA',
        modelColor: '#B92C2C',
        height: 400,
        width: 400,
        rotate: true,
        orbitControls: true,
        sceneClassName: '',
    };

    componentDidMount() {
        this.renderModel(this.props);
    }

    renderModel(props) {
        let camera, scene, renderer, mesh, distance, controls;
        const {url, file, width, height, modelColor, backgroundColor, orbitControls, sceneClassName, onSceneRendered} = props;
        let xDims, yDims, zDims;
        let component = this;


        scene = new THREE.Scene();
        distance = 10000;
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.x = 0;
        directionalLight.position.y = 1;
        directionalLight.position.z = 0;
        directionalLight.position.normalize();
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);

        const onLoad = geometry => {
            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            geometry.center();

            mesh = new THREE.Mesh(
                geometry,
                new THREE.MeshLambertMaterial({
                        overdraw: true,
                        color: modelColor,
                    }
                ));

            geometry.computeBoundingBox();
            xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
            yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
            zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

            scene.add(mesh);

            camera = new THREE.PerspectiveCamera(30, width / height, 1, distance);
            camera.position.set(0, 0, Math.max(xDims * 3, yDims * 3, zDims * 3));

            scene.add(camera);

            renderer = new THREE.WebGLRenderer({
                preserveDrawingBuffer: true,
                antialias: true
            });
            renderer.setSize(width, height);
            renderer.setClearColor(backgroundColor, 1);
            renderer.domElement.className = sceneClassName;


            if (orbitControls) {
                controls = new OrbitControls(camera, ReactDOM.findDOMNode(component));
                controls.enableKeys = false;
                controls.addEventListener('change', orbitRender);
            }

            ReactDOM.findDOMNode(this).replaceChild(renderer.domElement,
                ReactDOM.findDOMNode(this).firstChild);

            render();

            if (typeof onSceneRendered === "function") {
                onSceneRendered(ReactDOM.findDOMNode(renderer.domElement))
            }
        };

        const onProgress = (xhr) => {
            if (xhr.lengthComputable) {
                let percentComplete = xhr.loaded / xhr.total * 100;
            }
        };

        const loader = new STLLoader();

        if (file) {
            loader.loadFile(file, onLoad, onProgress);
        } else {
            loader.load(url, onLoad, onProgress);
        }

        const render = () => {
            renderer.render(scene, camera);
        };

        const orbitRender = () => {
            render();
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
            return false
        }
        return true
    }

    componentWillUpdate(nextProps, nextState) {
        this.renderModel(nextProps);
    }

    componentDidCatch(error, info) {
        console.log(error, info)
    }

    render() {
        return (
            <div
                className={this.props.className}
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    overflow: 'hidden',
                }}
            >
                <div style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ScaleLoader
                        color={'#123abc'}
                        loading={true}
                    />
                </div>
            </div>
        );
    };
};

module.exports = STLViewer;
