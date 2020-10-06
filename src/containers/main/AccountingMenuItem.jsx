import React from "react";
import { withRouter } from "react-router-dom";
import TopBar from './TopBar';
import Clogo from './Clogo';
import NavSec from './NavSec';
import ProCon from './ProCon';
import { render } from "@testing-library/react";




class AccountingMenuItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            accounts: [],
            products: [],
            ProOrAcc: "Accounts",
            isacc_pro: "acc_det",
            err_pro: null,
            err_acc: null,
            specific_acc: null,
          }
        this.AddProCrossBtn = this.AddProCrossBtn.bind(this);
        this.AddAccCrossBtn = this.AddAccCrossBtn.bind(this);
        this.setProOrAcc = this.setProOrAcc.bind(this);
        this.backToAcc = this.backToAcc.bind(this);
        this.fi = this.fi.bind(this);
        this.navTo = this.navTo.bind(this);
        this.Sorting_Pro = this.Sorting_Pro.bind(this);
    }
    Sorting_Pro = async () => {
        let mode = await document.getElementById("new_old_navsec");
    
        if (this.state.ProOrAcc == "Products") {
          fetch(`/api/products?mode=${mode.value}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.Products) {
                this.setState(() => {
                  return {
                    products: data.Products,
                    tempProducts: data.Products
                  };
                });
              }
            })
            .catch(err => {
              this.setState(() => {
                return {
                  err_pro: true
                };
              });
            });
        } else {
          fetch(`/api/accounts?mode=${mode.value}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.accounts) {
                this.setState(() => {
                  return {
                    accounts: data.accounts,
                    tempAcc: data.accounts
                  };
                });
              }
            })
            .catch(err => {
              this.setState(() => {
                return {
                  err_acc: true
                };
              });
            });
        }
      };
    
      filter = arr => {
        let temp = this.state.tempAcc.filter(e => {
          if (arr.length === 0) {
            return true;
          }
          for (let a of arr) {
            if (a.value === "all") {
              return true;
            }
            if (a.value === "traders" && (e.acc_type === "debtors" || e.acc_type === "creditors")) {
              return true;
            }
            if (a.value === e.acc_type) {
              return true;
            }
          }
          return false;
        });
    
        this.setState({ accounts: temp });
      };
       Sorting_Pro = async () => {
    let mode = await document.getElementById("new_old_navsec");
    
    if (this.state.ProOrAcc == "Products") {
      fetch(`/api/products?mode=${mode.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.Products) {
            this.setState(() => {
              return {
                products: data.Products,
                tempProducts: data.Products
              };
            });
          }
        })
        .catch(err => {
          this.setState(() => {
            return {
              err_pro: true
            };
          });
        });
    } else {
      fetch(`/api/accounts?mode=${mode.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.accounts) {
            this.setState(() => {
              return {
                accounts: data.accounts,
                tempAcc: data.accounts
              };
            });
          }
        })
        .catch(err => {
          this.setState(() => {
            return {
              err_acc: true
            };
          });
        });
    }
    };
    
    filter = arr => {
    let temp = this.state.tempAcc.filter(e => {
      if (arr.length === 0) {
        return true;
      }
      for (let a of arr) {
        if (a.value === "all") {
          return true;
        }
        if (a.value === "traders" && (e.acc_type === "debtors" || e.acc_type === "creditors")) {
          return true;
        }
        if (a.value === e.acc_type) {
          return true;
        }
      }
      return false;
    });
    
    this.setState({ accounts: temp });
    };
    getProducts = async () => {
    let url = "/api/products?mode=newest";
    let mode = await document.getElementById("new_old_navsec");
    
    if (mode && mode.value == "oldest") {
      url = "/api/products?mode=oldest";
    }
    
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Products) {
          this.setState(() => {
            return {
              products: data.Products,
              tempProducts: data.Products
            };
          });
        }
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_pro: true
          };
        });
      });
    };
    getAccounts = () => {
    fetch("/api/accounts?mode=newest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.accounts) {
          this.setState(() => {
            return {
              accounts: data.accounts,
              tempAcc: data.accounts
            };
          });
        }
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_acc: true
          };
        });
      });
    };
    fi=()=> {
    let data = document.getElementById("searchForProOrAcc").value;
    data = data.toLowerCase();
    if (this.state.ProOrAcc === "Products") {
      let fPro = this.state.tempProducts.filter(pro => {
        if (data === "") {
          return true;
        } else if (
          pro.product_name.toLowerCase().indexOf(data) === -1 &&
          pro.hsn_num.toLowerCase().indexOf(data) === -1
        ) {
          return false;
        } else {
          return true;
        }
      });
    
      this.setState(() => {
        return {
          products: fPro
        };
      });
    }
    
    if (this.state.ProOrAcc === "accounts") {
      let fPro = this.state.tempAcc.filter(acc => {
        if (data === "") {
          return true;
        } else if (
          acc.acc_name.toLowerCase().indexOf(data) === -1 &&
          acc.print_name.toLowerCase().indexOf(data) === -1
        ) {
          return false;
        } else {
          return true;
        }
      });
    
      this.setState(() => {
        return {
          accounts: fPro
        };
      });
    }
    }
    
    AddProCrossBtn(){
    this.setState(prevState => {
      if (this.state.AddPro)
        return {
          AddPro: false
        };
      else
        return {
          AddPro: true
        };
    });
    };
    
    AddAccCrossBtn() {
    this.setState(() => {
      if (this.state.AddAcc)
        return {
          AddAcc: false
        };
      else
        return {
          AddAcc: true
        };
    });
    }
    
    setProOrAcc(selectedOption) {
    if (selectedOption === "Accounts ") {
      console.log("acc");
      //this.props.history.push(`/main/accounting/accounts}`)
      this.getAccounts();
    }
    if (selectedOption === "Products") {
      console.log("rpo");
      //this.props.history.push(`/main/accounting/products}`)
      this.getProducts();
    }
    this.setState(prevState => {
      return {
        ProOrAcc: selectedOption
      };
    });
    }
    backToAcc() {
    this.setState(() => {
      return {
        specific_acc: null,
        isacc_pro: "acc_det"
      };
    });
    }
    navTo(page) {
    this.props.history.push(`/main/accounting/${page}`)
    this.setState({page: page});
    }
    setAccProfile(ans) {
    this.setState(() => {
      return {
        isacc_pro: ans
      };
    });
    }
    
    getspecific_acc = i => {
    this.setState(() => {
      return {
        specific_acc: this.state.accounts[i]
      };
    });
    };
    
  render(){
    console.log(this.props)
    const { id: item = "accounts" } = this.props;
    const { id = item } = this.props.match.params;
    const data = {
    "accounts": {   
      main: (<>
        <NavSec
          AddProCrossBtn={this.AddProCrossBtn}
          navItems={["Accounts", "Products"]}
          getProducts={this.getProducts}
          getAccounts={this.getAccounts}
          setProOrAcc={this.setProOrAcc}
          ProOrAcc="Accounts"
          AddAccCrossBtn={this.AddAccCrossBtn}
          fi={this.fi}
          Sorting_Pro={this.Sorting_Pro}
        />
     
        <div>Accounts</div>
      </>)
    
    },
    "products": {
        main: (<>
            <NavSec
              AddProCrossBtn={this.AddProCrossBtn}
              navItems={["Accounts", "Products"]}
              getProducts={this.getProducts}
              getAccounts={this.getAccounts}
              setProOrAcc={this.setProOrAcc}
              ProOrAcc="Products"
              AddAccCrossBtn={this.AddAccCrossBtn}
              fi={this.fi}
              Sorting_Pro={this.Sorting_Pro}
            />
           
            <ProCon
              products={this.state.products}
              filter={this.filter}
              accounts={this.state.accounts}
              getProducts={this.getProducts}
              getAccounts={this.getAccounts}
              ProOrAcc={this.state.ProOrAcc}
              setAccProfile={this.setAccProfile}
              getspecific_acc={this.getspecific_acc}
              isacc_pro={this.state.isacc_pro}
              err_pro={this.state.err_pro}
              err_acc={this.state.err_acc}
            />
           </> )
    }
  }
  return (
    data && data[id] ? (

     data[id].main
  
  ) : null
  )
 } 
};

export default withRouter(AccountingMenuItem);