import React, {Component} from 'react';
import {OBJViewer, STLViewer} from 'npm-react-component-starter';

class App extends Component {
    render() {
        return (
            <div className="App">
                <STLViewer url="https://github.com/bohdanbirdie/react-stl-obj-viewer/blob/master/test-app/build/bottle.stl" className="stl" modelColor="#FF0000"/>
                <OBJViewer url="https://github.com/bohdanbirdie/react-stl-obj-viewer/blob/master/test-app/build/bb8.obj" className="obj" modelColor="#FF0000"/>
            </div>
        );
    }
}

export default App;
