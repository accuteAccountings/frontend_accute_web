import React from 'react'
import Home from '../containers/Home'

export default class Home_Page extends React.Component{
    render(){
        return(
            <div className = "home_page_admin">
                <Home pagehandler = {this.props.pageHandler} 
                users = {this.props.users} specificUser = {this.props.specificUser} />
            </div>
        )
    }
}