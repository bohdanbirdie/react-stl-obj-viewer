# react-stl-obj-viewer

React components to view STL and OBJ models.
Based on THREE.js and [react-stl-viewer](https://github.com/chiedolabs/react-stl-viewer)


## How to use
1. Use OBJ or STL loader

    ```import {OBJViewer, STLViewer} from 'npm-react-component-starter';```
2. Pass props to viewers:

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
    };
```
Default props
```
static defaultProps = {
        backgroundColor: '#EAEAEA',
        modelColor: '#B92C2C',
        height: 400,
        width: 400,
    };
```

## Convert scene to screenshot

Simply get your element _(canvas scene)_ by any selector and call `.toDataURL("image/png")` on it.

## Live demo
Will be added soon.
