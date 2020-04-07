import React from 'react';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';

class App extends React.Component {

    render() {

        return (

            <div className="app">
                <div className="side">
                    <SideBar />
                </div>

                <div className="pageBody">

                    <TopBar />

                </div>




            </div>
        )
    }
}

export default App