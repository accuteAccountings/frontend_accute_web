import React from "react";
import {Switch,Route} from 'react-router-dom';
import MainPageMenuItem from './MainPageMenuItem';
import SideBar from "containers/main/SideBar";
import AddProducts from "containers/main/AddProduct";
import AddAcc from "containers/main/AddAcc";
import AddAccountFromUsers from "containers/main/AddAccountFromUsers";

class App extends React.Component {
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

  getspecific_acc = i => {
    this.setState(() => {
      return {
        specific_acc: this.state.accounts[i]
      };
    });
  };

  backToAcc() {
    this.setState(() => {
      return {
        specific_acc: null,
        isacc_pro: "acc_det"
      };
    });
  }

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

  fi() {
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
    if (this.state.ProOrAcc === "Accounts") {
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

  navTo(page) {
  //  this.props.history.push(`/main/${page}`)
    this.setState(() => {
      return {
        page: page
      };
    });
  }
  navToSubMenu(page,menu) {
    this.props.history.push(`${this.props.location.pathname}/${menu}`)
    this.setState(() => {
      return {
        page: page
      };
    });
  }

  AddProCrossBtn = () => {
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
  AddAccFromUsersCrossBtn = () => {
    this.setState(() => {
      if (this.state.AddAccountFromUsers)
        return {
          AddAccountFromUsers: false
        };
      else
        return {
          AddAccountFromUsers: true
        };
    });
  };

  setAccProfile(ans) {
    this.setState(() => {
      return {
        isacc_pro: ans
      };
    });
  }

  setProOrAcc(ans) {
    if (ans === "Accounts ") {
      console.log("acc");
      this.getAccounts();
    }
    if (ans === "Products") {
      console.log("rpo");

      this.getProducts();
    }
    this.setState(prevState => {
      return {
        ProOrAcc: ans
      };
    });
  }
  setPVoJVoDN = (ans, mode, data) => {
    this.setState(prevState => {
      return {
        PVoJVoDN: ans,
        vouchMode: mode,
        vouchEData: data
      };
    });
  };

  rmVouch = () => {
    this.setState(prevState => {
      return {
        PVoJVoDN: "no"
      };
    });
  };
  rmDebit = () => {
    this.setState(prevState => {
      return {
        PVoJVoDN: "no"
      };
    });
  };

  rmCredit = () => {
    this.setState(prevState => {
      return {
        PVoJVoDN: "no"
      };
    });
  };

  setjoBill = ans => {
    this.setState(() => {
      return {
        jobill_num: ans
      };
    });
  };

  setVouchPage = p => {
    this.setState({ vouchPage: p });
  };
  constructor(props) {
    super(props);
    this.AddProCrossBtn = this.AddProCrossBtn.bind(this);
    this.AddAccCrossBtn = this.AddAccCrossBtn.bind(this);
    this.setAccProfile = this.setAccProfile.bind(this);
    this.setProOrAcc = this.setProOrAcc.bind(this);
    this.backToAcc = this.backToAcc.bind(this);
    this.fi = this.fi.bind(this);
    this.setjoBill = this.setjoBill.bind(this);
    this.navTo = this.navTo.bind(this);
    this.navToSubMenu = this.navToSubMenu.bind(this);
    this.Sorting_Pro = this.Sorting_Pro.bind(this);

    this.state = {
      AddPro: false,
      AddAcc: false,
      AddAccountFromUsers: false,
      page: "dashboard",
      ProOrAcc: "Accounts",
      PVoJVoDN: "no",
      products: [],
      tempProducts: [],
      accounts: [],
      tempAcc: [],
      AddVouch: true,
      vouchPage: "pv",
      isacc_pro: "acc_det",
      specific_acc: null,
      vouchEData: [],
      jobill_num: null,
      vouchMode: "add",
      vouchData: [],
      err_pro: null,
      err_acc: null
    };
  }
  render() {
    return (
      <div className="app">
        <div className="side">
          <SideBar
            AddAccCrossBtn={this.AddAccCrossBtn}
            AddAccFromUsersCrossBtn={this.AddAccFromUsersCrossBtn}
            setProOrAcc={this.setProOrAcc}
            navTo={this.navTo}
            navToSubMenu={this.navToSubMenu}
            actPage={this.state.page}
            setVouchPage={this.setVouchPage}
            setAccProfile={this.setAccProfile}
            backToAcc={this.backToAcc}
          />
        </div>

        <Switch>
        <Route exact path={this.props.match.path}>
          <MainPageMenuItem id="dashboard"/>
        </Route>
        <Route path={`${this.props.match.path}/:id`} component={MainPageMenuItem}/>
        </Switch>
        {this.state.AddPro ? <AddProducts AddProCrossBtn={this.AddProCrossBtn} getProducts={this.getProducts} /> : null}
        {this.state.AddAcc ? <AddAcc AddAccCrossBtn={this.AddAccCrossBtn} getAccounts={this.getAccounts} /> : null}
        {this.state.AddAccountFromUsers ? (
          <AddAccountFromUsers  AddAccFromUsersCrossBtn={this.AddAccFromUsersCrossBtn} />
        ) : null}
      </div>
    );
  }
}
export default App;