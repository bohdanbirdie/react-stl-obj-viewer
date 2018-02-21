import React, {Component} from 'react';
import {OBJViewer, STLViewer} from 'npm-react-component-starter';

class App extends Component {
    render() {
        return (
            <div className="App">
                <STLViewer url={process.env.PUBLIC_URL + "/bottle.stl"} className="stl" modelColor="#FF0000"/>
                {/*<OBJViewer url={process.env.PUBLIC_URL + "/bb8.obj"} className="obj" modelColor="#FF0000"/>*/}
            </div>
        );
    }
}

export default App;
