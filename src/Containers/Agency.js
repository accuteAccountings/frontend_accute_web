import React from 'react'
import TaskManager from '../Components/TaskManager'
import AgencyPage from '../Components/AgencyPage'

export default class Agency extends React.Component{
    render(){
    return(
        <div className = "agency">
            <AgencyPage />
            <TaskManager />
        </div>
    )
    }
}