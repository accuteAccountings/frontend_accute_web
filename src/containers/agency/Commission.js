import React from 'react';
import Button from 'components/Button';

class Commission extends React.Component {
  state = {
    include_gst: true,
    include_unpaid: true,
    receivedAmount: 0,
  };

  HandleCheckBox = () => {
    this.setState(prevState => {
      return {
        include_gst: !prevState.include_gst,
      };
    });
  };

  componentDidMount() {}
  render() {
    return (
      <div className="commission_div">
        <div className="upper_comm_header">
          <div className="heading_name">Commission Details</div>
          <div className="fileter_options">
            <div>
              <input type="radio" id="all_entries" name="all" defaultChecked />
              <label for="all">All</label>
            </div>
            <div>
              <input type="radio" id="non_gst_entries" name="all" />
              <label for="all">Non GST Account</label>
            </div>
            <div>
              <input type="radio" id="gst_billed_entries" name="all" />
              <label for="all">GST Account</label>
            </div>
          </div>
        </div>
        <div className="sub_header_comm">
          <div className="checkboxes_entries">
            <div>
              <input type="checkbox" id="cal_with_gst" name="all" defaultChecked onChange={this.HandleCheckBox} />
              <label for="all">Calculate With GST</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="inc_unpaid_bills"
                name="all"
                defaultChecked
                onChange={() => {
                  this.setState(prevState => {
                    return {
                      include_unpaid: !prevState.include_unpaid,
                    };
                  });
                }}
              />
              <label for="all">Include Unpaid Bills</label>
            </div>
          </div>
        </div>
        <div className="active_users_inv">
          <div className="upper_head_one">
            <div className="upper">
              <div className="hd">ACTIVE USERS</div>
            </div>
            <div className="lower">
              <div className="id">Id.</div>
              <div className="name_city">Account Name</div>
              <div className="balance">Taxable Amount</div>
              {/* <div className="comm_per">Commission(%)</div> */}
              <div className="balance">Commission</div>
              <div className="balance">Recieved</div>
              <div className="balance">Pending</div>
              <div className="actions">Actions</div>
            </div>
            <div className="scroller">
              {this.props.accounts.map((e, i) => {
                return (
                  <User_Det
                    id={i + 1}
                    acc={e.id}
                    acc_name={e.acc_name}
                    city={e.address_line1}
                    include_gst={this.state.include_gst}
                    include_unpaid={this.state.include_unpaid}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class User_Det extends React.Component {
  Total = (vouch, acc) => {
    let t = 0;
    let x = 0;

    this.state.vouch.map(e => {
      if (this.props.include_gst) {
        if (this.props.include_unpaid) {
          if (e.supplier_id == this.props.acc && e.type == 'pv') {
            t = t + (e.totalAmt * e.set_commission) / 100;
          }
          if (e.type == 'dn' && e.customer_id === this.props.acc) {
            t = t - (e.totalAmt * e.set_commission) / 100;
          }
        } else {
          if (e.supplier_id === this.props.acc && e.status == 0 && e.type == 'pv') {
            t = t + (e.totalAmt * e.set_commission) / 100;
          }
          if (e.type == 'dn' && e.customer_id === this.props.acc) {
            t = t - (e.totalAmt * e.set_commission) / 100;
          }
        }
      } else {
        if (this.props.include_unpaid) {
          if (e.supplier_id === this.props.acc && e.type == 'pv') {
            x = (e.totalAmt / (e.gst + 100)) * 100;
            t = t + (x * e.set_commission) / 100;
          }
          if (e.type == 'dn' && e.customer_id === this.props.acc) {
            x = (e.totalAmt / (e.gst + 100)) * 100;
            t = t - (x * e.set_commission) / 100;
          }
        } else {
          if (e.type == 'pv' && e.supplier_id === this.props.acc && e.status == 0) {
            x = (e.totalAmt / (e.gst + 100)) * 100;
            t = t + (x * e.set_commission) / 100;
          }
          if (e.type == 'dn' && e.customer_id === this.props.acc && e.status == 0) {
            x = (e.totalAmt / (e.gst + 100)) * 100;
            t = t - (x * e.set_commission) / 100;
          }
        }
      }
    });

    return t;
  };

  TaxableAmt = () => {
    let t = 0;
    let x = 0;

    this.state.vouch.map(e => {
      if (this.props.include_gst) {
        if (this.props.include_unpaid) {
          if (e.supplier_id == this.props.acc && e.type === 'pv') {
            t = parseInt(t) + parseInt(e.totalAmt);
          }
          if (e.customer_id == this.props.acc && e.type === 'dn') {
            t = parseInt(t) - parseInt(e.totalAmt);
          }
        } else {
          if (e.supplier_id == this.props.acc && e.status == 0 && e.type == 'pv') {
            t = parseInt(t) + parseInt(e.totalAmt);
          }
          if (e.customer_id == this.props.acc && e.status == 0 && e.type == 'dn') {
            t = parseInt(t) - parseInt(e.totalAmt);
          }
        }
      } else {
        if (this.props.include_unpaid) {
          if (e.supplier_id == this.props.acc && e.type == 'pv') {
            x = (parseInt(e.totalAmt) / (parseInt(e.gst) + 100)) * 100;
            t = parseInt(t) + parseInt(x);
          }
          if (e.customer_id == this.props.acc && e.type == 'dn') {
            x = (parseInt(e.totalAmt) / (parseInt(e.gst) + 100)) * 100;
            t = parseInt(t) - parseInt(x);
          }
        } else {
          if (e.supplier_id == this.props.acc && e.status == 0 && e.type == 'pv') {
            x = (parseInt(e.totalAmt) / (parseInt(e.gst) + 100)) * 100;
            t = parseInt(t) + parseInt(x);
          }
          if (e.customer_id == this.props.acc && e.status == 0 && e.type == 'dn') {
            x = (parseInt(e.totalAmt) / (parseInt(e.gst) + 100)) * 100;
            t = parseInt(t) - parseInt(x);
          }
        }
      }
    });
    return t;
  };

  round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };

  getVouch = async () => {
    await fetch(`/api/vouch/commission/vouches?supplier=${this.props.acc}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState(() => {
            return {
              vouch: data,
            };
          });
        }
      });
  };

  constructor(props) {
    super(props);

    this.getVouch();

    this.state = {
      vouch: [],
    };
  }

  render() {
    let cal_gst = document.getElementById('cal_with_gst').checked;
    const tax = this.TaxableAmt();
    if (tax > 0) {
      return (
        <div className="lower_value_list">
          <div className="id">{this.props.id}</div>
          <div className="name_city"> {this.props.acc_name} </div>
          <div className="balance"> {tax} </div>
          {/* <div className="comm_per">1%</div> */}
          <div className="balance">{this.round(this.Total(), 2)}</div>
          <div className="balance">0</div>
          <div className="balance">0</div>
          <div className="actions">
            <button type="blue">Alter</button>
            <button type="blue">Statement</button>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Commission;
