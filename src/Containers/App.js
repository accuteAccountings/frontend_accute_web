import React from 'react';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import AddProducts from '../Components/AddProduct';
import AddAcc from '../Components/AddAcc';
import Clogo from '../Components/Clogo';
import NavSec from '../Components/NavSec';
import ProCon from '../Components/ProCon';
import AddVouch from '../Components/AddVouch';
import Dash from './Dash';

class App extends React.Component {
	getProducts = () => {
		fetch('/api/products', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.Products) {
					this.setState(() => {
						return {
							products: data.Products,
							tempProducts: data.Products
						};
					});
				}
			})
			.catch((err) => {
				// alert(err)
			});
	};

	getAccounts = () => {
		fetch('/api/accounts', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.accounts) {
					this.setState(() => {
						return {
							accounts: data.accounts
						};
					});
				}
			})
			.catch((err) => {
				// alert(err)
			});
	};

	fi() {
		let data = document.getElementById('searchForProOrAcc').value;

		if (this.state.ProOrAcc === 'Products') {
			let fPro = this.state.tempProducts.filter((pro) => {
				if (data === '') {
					return true;
				} else if (pro.product_name.indexOf(data) === -1) {
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
	}

	navTo(page) {
		this.setState(() => {
			return {
				page: page
			};
		});
	}

	AddProCrossBtn = () => {
		this.setState((prevState) => {
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

	setProOrAcc(ans) {
		if (ans === 'Accounts ') {
			console.log('acc');
			this.getAccounts();
		}
		if (ans === 'Products') {
			console.log('rpo');

			this.getProducts();
		}

		this.setState((prevState) => {
			return {
				ProOrAcc: ans
			};
		});
	}

	constructor(props) {
		super(props);
		this.AddProCrossBtn = this.AddProCrossBtn.bind(this);
		this.AddAccCrossBtn = this.AddAccCrossBtn.bind(this);
		this.setProOrAcc = this.setProOrAcc.bind(this);
		this.fi = this.fi.bind(this);

		this.navTo = this.navTo.bind(this);

		this.state = {
			AddPro: false,
			AddAcc: false,
			page: 'trans',
			ProOrAcc: 'Products',
			products: [],
			tempProducts: [],
			accounts: []
		};
	}

	render() {
		let currentPage = null;

		if (this.state.page === 'rep') {
			currentPage = (
				<div className="pageBody">
					<TopBar />
					<Clogo />
					<NavSec
						AddProCrossBtn={this.AddProCrossBtn}
						navItems={[ 'Challen Reg.', 'Daily Book ', 'Ledger' ]}
					/>
					<ProCon />
				</div>
			);
		}

		if (this.state.page === 'dash') {
			currentPage = (
				<div className="pageBody">
					<TopBar />
					<Clogo />
					<Dash addAccBtn={this.AddAccCrossBtn} />
				</div>
			);
		}

		if (this.state.page === 'accounting') {
			currentPage = (
				<div className="pageBody">
					<TopBar />
					<Clogo />
					<NavSec
						AddProCrossBtn={this.AddProCrossBtn}
						navItems={[ 'Accounts ', 'Products' ]}
						getProducts={this.getProducts}
						getAccounts={this.getAccounts}
						setProOrAcc={this.setProOrAcc}
						ProOrAcc={this.state.ProOrAcc}
						AddAccCrossBtn={this.AddAccCrossBtn}
						fi={this.fi}
					/>

					<ProCon
						products={this.state.products}
						accounts={this.state.accounts}
						ProOrAcc={this.state.ProOrAcc}
						getProducts={this.getProducts}
						getAccounts={this.getAccounts}
					/>
				</div>
			);
		}
		if (this.state.page === 'trans') {
			currentPage = (
				<div className="pageBody">
					<TopBar margin={{ marginBottom: '50px' }} />

					<NavSec AddProCrossBtn={this.AddProCrossBtn} isAddAccount={false} />
					<AddVouch />
				</div>
			);
		}

		return (
			<div className="app">
				<div className="side">
					<SideBar AddAccCrossBtn={this.AddAccCrossBtn} navTo={this.navTo} actPage={this.state.page} />
				</div>

				{currentPage}

				{this.state.AddPro ? (
					<AddProducts AddProCrossBtn={this.AddProCrossBtn} getProducts={this.getProducts} />
				) : null}
				{this.state.AddAcc ? (
					<AddAcc AddAccCrossBtn={this.AddAccCrossBtn} getAccounts={this.getAccounts} />
				) : null}
			</div>
		);
	}
}

export default App;
