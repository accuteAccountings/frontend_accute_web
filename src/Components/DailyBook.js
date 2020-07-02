import React from 'react'

export default class DailyBook extends React.Component{
    render(){
        return(
            <div className = "daily_book">
                <div className = "db_left">
                    <div className = "db_header">
                        <div className = "db_head">
                            Daily Book
                        </div>
                        <div className = "db_search_div">
                            <input type="search" placeholder = "Account Name" />
                            <span className = "acc_search_db">Search</span>
                        </div>
                    </div>
                    <div>
                        <DetCont />
                    </div>
                    <div>
                        <JoVouchDet />
                    </div>
                </div>
                <div className = "db_right">
                    <div className = "db_right_head">
                        GET LEDGER
                    </div>
                    <div className = "db_right_form">
                        <div className = "db_form_acc">
                            <span className = "db_form_acc_h">Account Name : </span>
                            <span><input type = "text" placeholder = "Account Name" />  </span>
                        </div>
                        <div className = "db_form_time">
                            <div className = "db_form_from">
                                <span className = "db_form_acc_h">From : </span>
                                <span><input type = "date" placeholder = "Account Name" />  </span>
                             </div>
                             <div className = "db_form_acc">
                             <span className = "db_form_acc_h">To : </span>
                             <span><input type = "date" placeholder = "Account Name" />  </span>
                          </div>
                        </div>
                        <div className = "db_btn">
                            <button>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class DetCont extends React.Component {
    render() {
      return (
        <div className="det_cont_vouch_db">
          <div className="det_cont_left vouc_det_left">
            <div className="acc_name_vouch">
              <span className="acc_id_vouch">1. </span>
              Sellername
              <span className="vouch_to">TO</span>
              <span className="vouch_costumer_name">Costumer</span>
            </div>
            <div className="vouch_bill_detail_db">
              <div className="acc_adress">
                <span className="acc_adress_head_db vouch_amount">Amount :</span> 8979799
              </div>
              <div className="acc_adress">
                <span className="acc_adress_head_db">Biil No : </span> 
                45464
              </div>
            </div>
          </div>
          <div className="det_cont_right_vouch vouch_right_db">
            <div className="vouch_date">
              <span className="acc_right_vouch"> Date:</span> 22/05/2020
            </div>
          </div>
        </div>
      );
    }
  }

  class JoVouchDet extends React.Component {
    render() {
      return (
        <div className="det_cont_vouch_db">
          <div className="det_cont_right_vouch">
            <div className=" vouch_bills_db">
              <span className="acc_id_vouch">1. </span>
              <span className="acc_right_vouch">Bills:</span> 1234 , 4563 , 45435
            </div>
            <div className="acc_name_vouch jovouch_det">
              <span>Seller Name </span>
              <span className="vouch_to">TO</span>
              <span className="vouch_costumer_name ">Costumer Name</span>
            </div>
          </div>
          <div className="det_cont_right_jovouch_db">
            <div className="vouch_date">
                <span className="acc_right_vouch"> Date:</span> {Date.now()}
            </div>
            <div className="vouch_bills">
              <span className="acc_right_vouch"> Amount:</span> 4246445
            </div>
          </div>
         
        </div>
      );
    }
  }