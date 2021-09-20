import React from 'react';
import SideBar from 'containers/agency/SideBar';
import TopBar from 'containers/agency/TopBar';
import AddProducts from 'containers/agency/AddProduct';
import AddAcc from 'containers/agency/AddAcc';
import Clogo from 'containers/agency/Clogo';
import NavSec from 'containers/agency/NavSec';
import ProCon from 'containers/agency/ProCon';
import AddVouch from 'containers/agency/AddVouch';
import VouchCon from 'containers/agency/VouchCon';
import Dash from './Dash';
import AddJovouch from 'containers/agency/AddJoVouch';
import Account_pro from 'containers/agency/Account_profile';
import DailyBook from 'containers/agency/DailyBook';
import Trash from 'containers/agency/Trash';
import Agency from 'pages/Agency';
import AddAccountFromUsers from 'containers/agency/AddAccountFromUsers';

export default class Accountings extends React.Component {
  Sorting_Pro = async () => {
    let mode = await document.getElementById('new_old_navsec');

    if (this.state.ProOrAcc == 'Products') {
      fetch(`/api/products?mode=${mode.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.Products) {
            this.setState(() => {
              return {
                products: data.Products,
                tempProducts: data.Products,
              };
            });
          }
        })
        .catch(err => {
          this.setState(() => {
            return {
              err_pro: true,
            };
          });
        });
    } else {
      fetch(`/api/accounts?mode=${mode.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.accounts) {
            this.setState(() => {
              return {
                accounts: data.accounts,
                tempAcc: data.accounts,
              };
            });
          }
        })
        .catch(err => {
          this.setState(() => {
            return {
              err_acc: true,
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
        if (a.value === 'all') {
          return true;
        }
        if (a.value === 'traders' && (e.acc_type === 'debtors' || e.acc_type === 'creditors')) {
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
    let url = '/api/products?mode=newest';
    let mode = await document.getElementById('new_old_navsec');

    if (mode && mode.value == 'oldest') {
      url = '/api/products?mode=oldest';
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.Products) {
          this.setState(() => {
            return {
              products: data.Products,
              tempProducts: data.Products,
            };
          });
        }
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_pro: true,
          };
        });
      });
  };

  getspecific_acc = i => {
    this.setState(() => {
      return {
        specific_acc: this.state.accounts[i],
      };
    });
  };

  backToAcc() {
    this.setState(() => {
      return {
        specific_acc: null,
        isacc_pro: 'acc_det',
      };
    });
  }

  getAccounts = () => {
    fetch('/api/accounts?mode=newest', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.accounts) {
          this.setState(() => {
            return {
              accounts: data.accounts,
              tempAcc: data.accounts,
            };
          });
        }
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_acc: true,
          };
        });
      });
  };

  fi() {
    let data = document.getElementById('searchForProOrAcc').value;
    data = data.toLowerCase();
    if (this.state.ProOrAcc === 'Products') {
      let fPro = this.state.tempProducts.filter(pro => {
        if (data === '') {
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
          products: fPro,
        };
      });
    }
    if (this.state.ProOrAcc === 'Accounts') {
      let fPro = this.state.tempAcc.filter(acc => {
        if (data === '') {
          return true;
        } else if (
          acc.acc_name.toLowerCase().indexOf(data) === -1
          // &&
          // acc.print_name.toLowerCase().indexOf(data) === -1
        ) {
          return false;
        } else {
          return true;
        }
      });

      this.setState(() => {
        return {
          accounts: fPro,
        };
      });
    }
  }

  navTo(page) {
    this.setState(() => {
      return {
        page: page,
      };
    });
  }

  AddProCrossBtn = () => {
    this.setState(prevState => {
      if (this.state.AddPro)
        return {
          AddPro: false,
        };
      else
        return {
          AddPro: true,
        };
    });
  };

  AddAccCrossBtn() {
    this.setState(() => {
      if (this.state.AddAcc)
        return {
          AddAcc: false,
        };
      else
        return {
          AddAcc: true,
        };
    });
  }
  AddAccFromUsersCrossBtn = () => {
    this.setState(() => {
      if (this.state.AddAccountFromUsers)
        return {
          AddAccountFromUsers: false,
        };
      else
        return {
          AddAccountFromUsers: true,
        };
    });
  };

  setAccProfile(ans) {
    this.setState(() => {
      return {
        isacc_pro: ans,
      };
    });
  }

  setProOrAcc(ans) {
    if (ans === 'Accounts ') {
      console.log('acc');
      this.getAccounts();
    }
    if (ans === 'Products') {
      console.log('rpo');

      this.getProducts();
    }
    this.setState(prevState => {
      return {
        ProOrAcc: ans,
      };
    });
  }
  setPVoJVoDN = (ans, mode, data) => {
    this.setState(prevState => {
      return {
        PVoJVoDN: ans,
        vouchMode: mode,
        vouchEData: data,
      };
    });
  };

  rmVouch = () => {
    this.setState(prevState => {
      return {
        PVoJVoDN: 'no',
      };
    });
  };
  rmDebit = () => {
    this.setState(prevState => {
      return {
        PVoJVoDN: 'no',
      };
    });
  };

  rmCredit = () => {
    this.setState(prevState => {
      return {
        PVoJVoDN: 'no',
      };
    });
  };

  setjoBill = ans => {
    this.setState(() => {
      return {
        jobill_num: ans,
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
      AddAccountFromUsers: false,
      page: 'dash',
      ProOrAcc: 'Accounts',
      PVoJVoDN: 'no',
      products: [],
      tempProducts: [],
      accounts: [],
      tempAcc: [],
      AddVouch: true,
      vouchPage: 'pv',
      isacc_pro: 'acc_det',
      specific_acc: null,
      vouchEData: [],
      jobill_num: null,
      vouchMode: 'add',
      vouchData: [],
      err_pro: null,
      err_acc: null,
    };
  }

  render() {
    return (
      <>
        {this.state.PVoJVoDN === 'pv' && (
          <AddVouch which="pv" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
        )}
        {this.state.PVoJVoDN === 'jv' && (
          <AddJovouch
            mode={this.state.vouchMode}
            EData={this.state.vouchEData}
            rm={this.rmVouch}
            jobill_num={this.state.jobill_num}
          />
        )}
        {this.state.PVoJVoDN === 'dn' && (
          <AddVouch which="dn" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
        )}
        {this.state.PVoJVoDN === 'cn' && (
          <AddVouch which="cn" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
        )}
        {this.state.PVoJVoDN === 'no' && (
          <VouchCon
            setPVoJVoDN={this.setPVoJVoDN}
            vouchPage={this.state.vouchPage}
            setVouchPage={this.setVouchPage}
            specificJoVouch={this.specificJoVouch}
            setjoBill={this.setjoBill}
          />
        )}
      </>
    );
  }
}
