import React from 'react';
import Button from "../components/Button.jsx";

export default class UserLists extends React.Component{

    suspendUser = (id) => {
        fetch(`dev.accute.live/api/users/suspend?id=${id}` , {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => res.json())
        .then((data) => {
            if(data){
                alert('Suspended')
            }
        })
    }

    
    render(){
        return(
            <div className = "users_list_page">
                <div className = "top_user_lp">
                    <div className = "head">Users List</div>
                    <div className = "search">
                        <input placeholder = "Search" type = "Search" />
                    </div>
                </div>
                <div className = "user_table_lap">
                    <div className = "top_vella"></div>
                    {this.props.users.map((e) => {
                        return(
                            <div className = "user_list_det_row">
                                <div className = "user_div">
                                    <div className = "pic">
                                        <img src = {e.pro_img} />
                                    </div>
                                    <div className = "details">
                                        <div className = "acc_ap">
                                            <div className = "acc_name">{e.full_name}</div>
                                            <div className = "userId">
                                                <span className = "userId_head">User Id - </span>
                                                <span className = "value">{e.id}</span>
                                            </div>
                                        </div>
                                            <div className = "companyName_ap">
                                                <div className = "compNAme_light">
                                                    Company Name : 
                                                </div>
                                                <div className = "compName_bold">
                                                    ABC Pvt. Ltd.
                                                </div>
                                            </div>
                                            <div className = "active_products_ap">
                                                <div className = "active_head">Active Products :</div>
                                                <div className = "agency_trading">
                                                    <div className = "agency">
                                                        <span className = "head_name_ap">1. Agency</span>
                                                        <span className = "code">(code - 01)</span>
                                                    </div>
                                                    <div className = "agency">
                                                        <span className = "head_name_ap">1. Trading</span>
                                                        <span className = "code">(code - 02)</span>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className = "right_between_view">
                                    <div className = "buttons_user_lists">
                                        <div className = "btn_view_profile" onClick = {async () => { 
                                            await this.props.specificUser(e.id -1)
                                            await this.props.pageHandler('profile')
                                        }
                                        }>
                                            <Button type="green">View Profile</Button>  
                                        </div>

                                        <div className = "suspend" onClick = {() =>  this.suspendUser(e.id)}>
                                            <Button type = "blue">Suspend</Button>
                                        </div>
                                    </div>

                                    <div className = "member_since">
                                        <div className = "member_bootm_div">
                                            <span className = "light_head_mmber">Member Since : </span>
                                            <span className = "mmber_date">{e.createdAt.slice(0,10)}</span>
                                        </div>
                                        <div className = "time">
                                            {e.createdAt.slice(11 , 16)}
                                        </div>
                                    </div>
                                </div>
                    </div>
                        )
                    })}
                    
                </div>
            </div>
        )
    }
} 

