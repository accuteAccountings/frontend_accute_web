import React from "react";

import AddAcc from "../Components/AddAcc";
import AddProducts from "../Components/AddProduct";
import Delete from "../Components/Delete";
import pencil from "../img/pencil.svg";
import trash from "../img/trash.svg";

class ProCon extends React.Component {
  deleteHide = () => {
    this.setState(() => {
      return { delete: false };
    });

    if (this.props.ProOrAcc === "Products") {
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
        addProduct: true
      };
    });
  };
  showAddAcc = id => {
    this.setState(() => {
      return {
        accData: this.props.accounts.find(p => p.id === id),
        addAcc: true
      };
    });
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
      accData: {}
    };
  }

  render() {
    return (
      <div className="pro_compo">
        {this.state.addProduct && (
          <AddProducts
            AddProCrossBtn={this.hideAddProduct}
            getProducts={this.props.getProducts}
            mode={"view"}
            data={this.state.proData}
          />
        )}
        {this.state.addAcc && (
          <AddAcc
            AddAccCrossBtn={this.hideAddAcc}
            getAccounts={this.props.getAccounts}
            mode={"view"}
            data={this.state.accData}
          />
        )}

        {this.state.delete && (
          <Delete
            deleteHide={this.deleteHide}
            deleteUrl={this.state.deleteUrl}
          />
        )}

        <div className="pro_con">
          {this.props.ProOrAcc === "Products" ? (
            <div>
              {this.props.products.map((pro, i) => {
                return (
                  <div className="det_cont_pro">
                    <div className="det_sub_cont">
                      <div className="pro_name">
                        <span className="acc_id">{i + 1}. </span>
                        {pro.product_name}
                      </div>
                      <div className="pro_num">
                        <span className="acc_adress_head">HSN No.:</span>
                        {pro.hsn_num}
                      </div>
                    </div>
                    <div className="det_cont_icons">
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
          ) : (
            <div>
              {this.props.accounts.map((account, i) => {
                
                return (
                  <div onClick = {() => {this.props.getspecific_acc(i)
                  
                  }} className = "det_acc_div">
                  <DetCont
                    acc_name={account.acc_name}
                    type={account.acc_type}
                    print_name={account.print_name}
                    adress={account.address_line1}
                    gst={account.gst_num}
                    ph_number={account.phone_num}
                    i={i + 1}
                    id={account.id}
                    showAddAcc={this.showAddAcc}
                    deleteIt={this.deleteIt}
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
      <div className="det_cont" onClick = {this.props.setAccProfile}>
        <div className="det_cont_left">
          <div className="acc_name">
            <span className="acc_id">{this.props.i}. </span>
            {this.props.acc_name}
            <span className="acc_type">({this.props.type})</span>
          </div>
          <div className="acc_print">{this.props.print_name}</div>
          <div className="acc_adress">
            <span className="acc_adress_head">Add :</span> {this.props.adress}
          </div>
        </div>
        <div className="det_cont_right">
          <div className=" acc_gst">
            <span className="acc_right">GST.:</span> {this.props.gst}
          </div>
          <div className="acc_ph">
            <span className="acc_right"> Ph No.:</span> {this.props.ph_number}
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
              this.props.deleteIt(` /
          api / accounts / $ {
        this.props.id
      }
    `);
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
