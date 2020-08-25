import React from "react";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import AddProducts from "../Components/AddProduct";
import AddAcc from "../Components/AddAcc";
import Clogo from "../Components/Clogo";
import NavSec from "../Components/NavSec";
import ProCon from "../Components/ProCon";
import AddVouch from "../Components/AddVouch";
// import AddDebit from "../Components/AddDebit.js";
// import AddCredit from "../Components/AddCredit.js";
import VouchCon from "../Components/VouchCon";
import Dash from "./Dash";
import AddJovouch from "../Components/AddJoVouch";
import Account_pro from "../Components/Account_profile";
import DailyBook from "../Components/DailyBook";
import Trash from "../Components/Trash";
import Agency from "./Agency";
//desdfv

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
    this.Sorting_Pro = this.Sorting_Pro.bind(this);

    this.state = {
      AddPro: false,
      AddAcc: false,
      page: "dash",
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
    let currentPage = null;

    if (this.state.page === "rep") {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <Clogo />
          <NavSec AddProCrossBtn={this.AddProCrossBtn} navItems={["Challen Reg.", "Daily Book ", "Ledger"]} />
          {/* <ProCon /> */}
        </div>
      );
    }

    if (this.state.page === "dash") {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <Clogo />
          <Dash addAccBtn={this.AddAccCrossBtn} />
        </div>
      );
    }

    if (this.state.page === "accounting") {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <Clogo />
          <NavSec
            AddProCrossBtn={this.AddProCrossBtn}
            navItems={["Accounts", "Products"]}
            getProducts={this.getProducts}
            getAccounts={this.getAccounts}
            setProOrAcc={this.setProOrAcc}
            ProOrAcc={this.state.ProOrAcc}
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
        </div>
      );
    }
    if (this.state.page === "trash") {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <Clogo />
          <Trash
            setPVoJVoDN={this.setPVoJVoDN}
            vouchPage={this.state.vouchPage}
            setVouchPage={this.setVouchPage}
            specificJoVouch={this.specificJoVouch}
            setjoBill={this.setjoBill}
          />
        </div>
      );
    }

    if (this.state.specific_acc) {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <Account_pro
            account={this.state.specific_acc}
            acc_pro_val={this.state.isacc_pro}
            setAccProfile={this.setAccProfile}
            backToAcc={this.backToAcc}
          />
        </div>
      );
    }

    if (this.state.page === "rep") {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <DailyBook
            account={this.state.specific_acc}
            navTo={this.navTo}
            getspecific_acc={this.getspecific_acc}
            getAccounts={this.getAccounts}
            setAccProfile={this.setAccProfile}
          />
        </div>
      );
    }

    if (this.state.page === "agency") {
      currentPage = (
        <div className="pageBody">
          <TopBar />
          <Agency />
        </div>
      );
    }

    if (this.state.page === "trans") {
      currentPage = (
        <div className="pageBody">
          <TopBar
            margin={{
              marginBottom: "50px"
            }}
          />

          {this.state.PVoJVoDN === "pv" && (
            <AddVouch which="pv" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
          )}
          {this.state.PVoJVoDN === "jv" && (
            <AddJovouch
              mode={this.state.vouchMode}
              EData={this.state.vouchEData}
              rm={this.rmVouch}
              jobill_num={this.state.jobill_num}
            />
          )}
          {this.state.PVoJVoDN === "dn" && (
            <AddVouch which="dn" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
          )}
          {this.state.PVoJVoDN === "cn" && (
            <AddVouch which="cn" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
          )}
          {this.state.PVoJVoDN === "no" && (
            <VouchCon
              setPVoJVoDN={this.setPVoJVoDN}
              vouchPage={this.state.vouchPage}
              setVouchPage={this.setVouchPage}
              specificJoVouch={this.specificJoVouch}
              setjoBill={this.setjoBill}
            />
          )}
        </div>
      );
    }

    return (
      <div className="app">
        <div className="side">
          <SideBar
            AddAccCrossBtn={this.AddAccCrossBtn}
            setProOrAcc={this.setProOrAcc}
            navTo={this.navTo}
            actPage={this.state.page}
            setVouchPage={this.setVouchPage}
            setAccProfile={this.setAccProfile}
            backToAcc={this.backToAcc}
          />
        </div>

        {currentPage}

        {this.state.AddPro ? <AddProducts AddProCrossBtn={this.AddProCrossBtn} getProducts={this.getProducts} /> : null}
        {this.state.AddAcc ? <AddAcc AddAccCrossBtn={this.AddAccCrossBtn} getAccounts={this.getAccounts} /> : null}
      </div>
    );
  }
}

export default App;
