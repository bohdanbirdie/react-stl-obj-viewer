import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import OrbitControlsModule from 'three-orbit-controls'
import {OBJLoader} from 'three-addons';
import {ScaleLoader} from 'react-spinners';

const OrbitControls = OrbitControlsModule(THREE);


class OBJViewer extends Component {
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
        orbitControls: true,
        sceneClassName: '',
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.renderModel(this.props)
    }

    componentWillUpdate(nextProps) {
        this.renderModel(nextProps)
    }

    renderModel(props) {
        let camera, scene, renderer, controls;
        const {url, file, width, height, modelColor, backgroundColor, orbitControls, onSceneRendered, sceneClassName} = props;
        let xDims, yDims, zDims;

        camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
        scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.x = 0;
        directionalLight.position.y = 1;
        directionalLight.position.z = 0;
        directionalLight.position.normalize();
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light

        scene.add(ambientLight);
        scene.add(camera);

        const loader = new OBJLoader();


        const onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                // var percentComplete = xhr.loaded / xhr.total * 100;
            }
        };

        const onLoad = (object) => {
            const bbox = new THREE.Box3().setFromObject(object);

            xDims = bbox.max.x - bbox.min.x;
            yDims = bbox.max.y - bbox.min.y;
            zDims = bbox.max.z - bbox.min.z;
            camera.position.set(0, 0, Math.max(xDims * 3, yDims * 3, zDims * 3));

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.color.setStyle(modelColor);
                }
            });

            object.position.y = -95;
            scene.add(object);

            renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(backgroundColor, 1);
            renderer.setSize(width, height);
            renderer.domElement.className = sceneClassName;

            if (orbitControls) {
                controls = new OrbitControls(camera, ReactDOM.findDOMNode(this));
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

        const onError = function (xhr) {
        };


        if (file) {
            const reader = new FileReader();

            reader.onload = function (evt) {
                if (evt.target.readyState != 2) return;
                if (evt.target.error) {
                    alert('Error while reading file');
                    return;
                }

                onLoad(loader.parse(evt.target.result))

            };

            reader.readAsText(file);
        } else {
            loader.load(url, onLoad, onProgress, onError);
        }


        const render = () => {
            renderer.render(scene, camera);
        };

        const orbitRender = () => {
            render();
        };
    }

    componentWillReceiveProps() {
        this.setState({allowUpdate: true})
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
            return false
        }
        return true
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

module.exports = OBJViewer;
