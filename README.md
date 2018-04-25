# react-stl-obj-viewer

React components to view STL and OBJ models.
Based on THREE.js and [react-stl-viewer](https://github.com/chiedolabs/react-stl-viewer)

### [Live Demo](https://bohdanbirdie.github.io/stl-obj-demo/).

#### [Example](https://github.com/bohdanbirdie/stl-obj-demo/tree/master).

## How to use
1. Install the app
    - via npm ```npm install react-stl-obj-viewer --save```
    - via yarn ```yarn add react-stl-obj-viewer```

2. Use OBJ or STL loader

    ```import {OBJViewer, STLViewer} from 'npm-react-component-starter';```
3. Pass props to viewers:

```
static propTypes = {
        className: PropTypes.string, // Class name for viewer wrapper
        url: PropTypes.string,       // Url for STL or OBJ model
        file: PropTypes.object,      // File object of STL or OBJ model, 
                                     // when passed *url* prop will be ingonred
        width: PropTypes.number,     // Width of rendered area 
        height: PropTypes.number,    // Height of rendered area
        backgroundColor: PropTypes.string, // Scene background color 
        modelColor: PropTypes.string,// Model color(textures unsupported)
        sceneClassName: PropTypes.string, // Class name for rendered canvas scene
        onSceneRendered: PropTypes.func,  // Callback for rendered scene ready
    };
```
Default props
```
static defaultProps = {
        backgroundColor: '#EAEAEA',
        modelColor: '#B92C2C',
        height: 400,
        width: 400,
        sceneClassName: '',
    };
```

## Convert scene to screenshot

Simply get your element _(canvas scene)_ by any selector and call `.toDataURL("image/png")` on it.
___
hello dude!