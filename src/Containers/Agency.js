import React from 'react'
import TaskManager from '../Components/TaskManager'
import AgencyPage from '../Components/AgencyPage'

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
                <TaskManager />
            )}
            
        </div>
    )
    }
}