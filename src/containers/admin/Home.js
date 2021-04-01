import React from 'react'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

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
                                <Link className = "vall" to = "/admin/userslist" >
                                    View All
                                </Link>
                            </div>
                        </div>
                        {this.props.users.map((e ,i) => {
                            let url = "/admin/profile/" + e.id
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
                                <Link className = "view_btn" to = {url}>
                                    <Button type = "green" >View Profile</Button>
                                </Link>
                            </div>
                            )
                        })}
                     
                    </div>
                    </div>
        )
    }
}
