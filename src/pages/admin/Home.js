import React from 'react'
import Home from 'containers/admin/Home'

export default class Home_Page extends React.Component{
    getUsers = () => {
        fetch('/api/users')
        .then((res) => res.json())
        .then((data) => {
            this.setState(() => {
              return{
                users : data
              }
            })
        })
      }

    constructor(props){
        super(props)
        this.getUsers()

        this.state = {
            users : []
        }

    }
    render(){
        return(
            <div className = "home_page_admin">
                <Home 
                users = {this.state.users}  />
            </div>
        )
    }
}
