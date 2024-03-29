import React from 'react';
import AddAcc from 'containers/agency/AddAcc';
import AddProducts from 'containers/agency/AddProduct';
import Delete from 'components/Delete';
import pencil from 'assets/icons/pencil.svg';
import trash from 'assets/icons/trash.svg';

class ProCon extends React.Component {
  deleteHide = () => {
    this.setState(() => {
      return { delete: false };
    });

    if (this.props.ProOrAcc === 'Products') {
      this.props.getProducts();
    } else {
      this.props.getAccounts();
    }
  };
  deleteIt(url) {
    this.setState(() => {
      return { deleteUrl: url, delete: true };
    });
  }

  hideAddProduct = () => {
    this.setState(() => {
      return { addProduct: false };
    });
  };
  hideAddAcc = () => {
    this.setState(() => {
      return { addAcc: false };
    });
  };

  showAddProduct = id => {
    this.setState(() => {
      return {
        proData: this.props.products.find(p => p.id === id),
        addProduct: true,
      };
    });
  };
  showAddAcc = id => {
    this.setState(() => {
      return {
        accData: this.props.accounts.find(p => p.id === id),
        addAcc: true,
      };
    });
  };

  showFilter = () => {
    let arr = document.querySelectorAll('input[name="filter"]:checked');
    this.props.filter(arr);
  };

  constructor(props) {
    super(props);
    this.deleteIt = this.deleteIt.bind(this);

    this.props.getProducts();

    this.props.getAccounts();

    this.state = {
      delete: false,
      deleteUrl: ``,
      addProduct: false,
      proData: {},
      addAcc: false,
      accData: {},
    };
  }

  render() {
    return (
      <div className="pro_compo acc_pro_con">
        {this.props.ProOrAcc === 'Accounts' && !this.props.err_pro && (
          <div className="filter_acc">
            <h2 className="filter_acc_h">Show Only</h2>
            <hr />
            <ul>
              <li>
                <input name="filter" value="traders" id="check_cred" onClick={this.showFilter} type="checkbox" />
                Traders
              </li>
              <li>
                <input id="check_sub_ag" name="filter" value="Sub Agent" type="checkbox" onClick={this.showFilter} />
                Sub Agent
              </li>
              <li>
                <input id="check_trans" type="checkbox" name="filter" value="transport" onClick={this.showFilter} />
                Transport
              </li>
              {/* <li>
                <input id="check_bank" type="checkbox" name="filter" value="bank" onClick={this.showFilter} />
                Bank
              </li> */}
              <li>
                <input
                  onClick={e => {
                    if (e.target.checked) {
                      document.getElementById('check_cred').checked = true;
                      document.getElementById('check_sub_ag').checked = true;
                      document.getElementById('check_trans').checked = true;
                      // document.getElementById('check_bank').checked = true;
                    } else {
                      document.getElementById('check_cred').checked = false;
                      document.getElementById('check_sub_ag').checked = false;
                      document.getElementById('check_trans').checked = false;
                      // document.getElementById('check_bank').checked = false;
                    }
                    this.showFilter();
                  }}
                  id="check_sal"
                  name="filter"
                  value="all"
                  type="checkbox"
                />
                All
              </li>
            </ul>
          </div>
        )}
        {this.state.addProduct && (
          <AddProducts
            AddProCrossBtn={this.hideAddProduct}
            getProducts={this.props.getProducts}
            mode={'view'}
            data={this.state.proData}
          />
        )}
        {this.state.addAcc && (
          <AddAcc
            AddAccCrossBtn={this.hideAddAcc}
            getAccounts={this.props.getAccounts}
            mode={'view'}
            data={this.state.accData}
          />
        )}

        {this.state.delete && <Delete deleteHide={this.deleteHide} deleteUrl={this.state.deleteUrl} />}

        <div className="pro_con">
          {this.props.ProOrAcc === 'Products' ? (
            this.props.err_pro ? (
              <div className="wrong_alert">Something Went Wrong....</div>
            ) : (
              <div className="pro_con_con">
                {this.props.products.map((pro, i) => {
                  return (
                    <div className="det_cont_pro">
                      <div className="det_sub_cont">
                        <div className="pro_name">
                          <span className="acc_id">{pro.id}. </span>
                          {pro.product_name}
                        </div>
                        <div className="pro_num">
                          <span className="acc_adress_head">HSN No.:</span>
                          {pro.hsn_num}
                        </div>
                      </div>
                      <div className="det_cont_icons_pro">
                        <div
                          onClick={() => {
                            this.showAddProduct(pro.id);
                          }}
                        >
                          <img src={pencil} alt=" " />
                        </div>
                        <div
                          onClick={() => {
                            this.deleteIt(`/api/products/${pro.id}`);
                          }}
                        >
                          <img src={trash} alt=" " />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : this.props.err_acc ? (
            <div className="wrong_alert">Something Went Wrong....</div>
          ) : (
            <div>
              {this.props.accounts.map((account, i) => {
                return (
                  <div className="det_acc_div">
                    <DetCont
                      acc_name={account.acc_name}
                      type={account.acc_type}
                      // print_name={account.print_name}
                      adress={account.address_line1}
                      gst={account.gst_num}
                      ph_number={account.phone_num}
                      i={i + 1}
                      id={account.id}
                      showAddAcc={this.showAddAcc}
                      deleteIt={this.deleteIt}
                      getspecific_acc={this.props.getspecific_acc}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

class DetCont extends React.Component {
  render() {
    return (
      <div className="det_cont">
        <div
          className="det_cont_left"
          onClick={() => {
            window.location.href = `/agency/acc-profile/${this.props.id}`;
          }}
        >
          <div className="acc_name">
            <span className="acc_id">{this.props.i}. </span>
            {this.props.acc_name}
            <span className="acc_type">({this.props.type})</span>
          </div>
          {/* <div className="acc_print">{this.props.print_name}</div> */}
          <div className="acc_adress">
            <span className="acc_adress_head">{this.props.adress && 'Address : '}</span> {this.props.adress}
          </div>
        </div>
        <div
          className="det_cont_right"
          onClick={() => {
            this.props.getspecific_acc(this.props.i - 1);
          }}
        >
          <div className=" acc_gst">
            <span className="acc_right">{this.props.gst && 'GST :'}</span> {this.props.gst}
          </div>
          <div className="acc_ph">
            <span className="acc_right"> {this.props.ph_number && 'Ph No : '}</span> {this.props.ph_number}
          </div>
        </div>

        <div className="det_cont_icons">
          <div
            onClick={() => {
              this.props.showAddAcc(this.props.id);
            }}
          >
            <img src={pencil} alt=" " />
          </div>
          <div
            onClick={() => {
              this.props.deleteIt(`/api/accounts/${this.props.id}`);
            }}
          >
            <img src={trash} alt=" " />
          </div>
        </div>
      </div>
    );
  }
}

export default ProCon;
