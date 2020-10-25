import React from 'react'
import TaskManager from 'containers/agency/TaskManager'
import AgencyPage from 'containers/agency/AgencyPage';
import Inventory from 'containers/agency/Inventory'

export default class Agency extends React.Component{

    handleMode = (mode) => {
        this.setState(() => {
            return{
                mode : mode
            }
        })
    }

    constructor(props){
        super(props)

        this.state = {
            mode : 'invoice'
        }
    }
    render(){
    return(
        <div className = "agency">
            <button onClick = {() => {
                this.handleMode('invoice')
            }}>Invoice</button>
            <button onClick = {() => {
                this.handleMode('task')
            }}>Task Mangaer</button>

            {this.state.mode == 'invoice' && (
                <AgencyPage />
            )}
            {this.state.mode == 'task' && (
                <div className = "tk_invt">
                    <Inventory />
                    <br />
                    <br />
                    <TaskManager />
                </div>
            )}
            
        </div>
    )
    }
}