import React from 'react'
import Button from 'components/Button'

export default class Home extends React.Component{

   
    render(){
        return(
                <div>
                    <div className = "num_users_total">
                        <div className = "numbers">
                            {this.props.users.length}
                        </div>
                        <div className = "total">
                            Total Users 
                        </div>
                    </div>
                    <div className = "new_list_users_hap">
                        <div className = "list_home_users">
                            <div className = "head_top">
                                <div className = "new_user">
                                    New Users
                                </div>
                                <div className = "vall" onClick = {() => {
                                    this.props.pagehandler('user_list')
                                }}>
                                    View All
                                </div>
                            </div>
                        </div>
                        {this.props.users.map((e ,i) => {
                            return(
                                i < 5 &&
                                <div className = "user_new_ap">
                                <div className = "user_det_ap">
                                    <div className = "pic">
                                        <img src = {e.pro_img} />
                                    </div>
                                    <div className = "details_account">
                                        <div className = "acc_name_ap">
                                            <span className = "name">{e.full_name} - </span>
                                            <span className = "id">{e.id}</span>
                                        </div>
                                        <div className = "company">
                                            <span className = "title">Company Name :</span>
                                            <span className = "comp_name">{' '}ABC Pvt. Ltd.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className = "view_btn" onClick = {async() => { 
                                    await this.props.specificUser(e.id -1)
                                    await this.props.pagehandler('profile')
                                }
                                }>
                                    <Button type = "green" >View Profile</Button>
                                </div>
                            </div>
                            )
                        })}
                     
                    </div>
                    </div>
        )
    }
}
