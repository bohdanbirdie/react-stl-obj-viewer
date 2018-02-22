import React, {Component} from 'react';
import {OBJViewer, STLViewer} from 'npm-react-component-starter';

class App extends Component {
    render() {
        return (
            <div className="App">
                <STLViewer
                    onSceneRendered={(element) => {
                        console.log(element.toDataURL("image/png"))
                    }}
                    url={process.env.PUBLIC_URL + '/bottle.stl'}
                    className="stl"
                    modelColor="#FF0000"/>

                {/*<OBJViewer*/}
                    {/*onSceneRendered={(element) => {*/}
                        {/*console.log(element.toDataURL("image/png"))*/}
                    {/*}}*/}
                    {/*sceneClassName="test-scene"*/}
                    {/*url='https://3dbear.blob.core.windows.net/cdn/models/b4589679-5ef6-4973-a00d-398f251cd42bobj'*/}
                    {/*className="obj"*/}
                    {/*modelColor="#FF0000"/>*/}
            </div>
        );
    }
}

export default App;
