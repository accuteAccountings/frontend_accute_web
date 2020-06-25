import React from 'react';
import cross from './../img/cancel.svg';
import AddProducts from './AddProduct';

async function postData(url = '', data) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			// 'Content-Type': 'multipart/form-data'
			// 'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

class AddVouch extends React.Component {
	async addVouch() {
		let bill_date = document.querySelector('#vouch_bill_date').value;
		let type = document.querySelector('#vouch_type').value;
		let bill_num = document.querySelector('#vouch_bill_no').value;
		let g_r_num = document.querySelector('#vouch_gr_no').value;
		let transport_name = document.querySelector('#vouch_transport_name').value;
		let supplier = document.querySelector('#vouch_sup').value;
		let supplier_agent = document.querySelector('#vouch_sup_agent').value;
		let set_commission = document.querySelector('#vouch_comission').value;
		let customer = document.querySelector('#vouch_customer').value;

		let Vdata = {
			bill_date,
			type,
			bill_num,
			g_r_num,
			transport_name,
			supplier,
			supplier_agent,
			set_commission,
			customer,
			items: this.state.items
		};
		const isTrue = await postData('/api/vouch', Vdata);
		if (isTrue) {
			this.props.rm();
		} else {
			alert('Unable to save. Please Try again');
		}
	}

	vochAddPro() {
		let pro_name = document.querySelector('#vouch_pro_item').value;

		if (!pro_name) return;
		let vouch_quantity = document.querySelector('#vouch_quantity').value;
		let vouch_gst = document.querySelector('#vouch_gst').value;
		let vouch_rate = document.querySelector('#vouch_rate').value;

		let pro_id = this.state.products.find((o) => {
			// eslint-disable-next-line
			return o.product_name === pro_name;
		});
		if (!!!pro_id) {
			this.setState({ addPro: true, NewProName: pro_name });
			return;
		}
		let v_amount = parseInt(vouch_rate) * parseInt(vouch_quantity);
		let item = {
			pro_id: pro_id.id,
			product_name: pro_name,
			quantity: vouch_quantity,
			gst: vouch_gst,
			rate: vouch_rate,
			amount: v_amount
		};

		let arr = this.state.items;
		arr.push(item);
		let total = 0;
		arr.map((e) => {
			total = total + e.amount;
		});

		this.setState((prevState) => {
			return {
				items: arr,
				totalAmt: total
			};
		});
	}

	removeItem = (index) => {
		let arr = this.state.items;

		arr.splice(index, 1);

		this.setState(() => {
			return {
				items: arr
			};
		});
	};

	editItem = (index) => {
		let pro_id = document.querySelector('#vouch_pro_item');

		let vouch_quantity = document.querySelector('#vouch_quantity');
		let vouch_gst = document.querySelector('#vouch_gst');
		let vouch_rate = document.querySelector('#vouch_rate');

		pro_id.value = this.state.items[index].pro_id;
		vouch_quantity.value = this.state.items[index].quantity;
		vouch_gst.value = this.state.items[index].gst;
		vouch_rate.value = this.state.items[index].rate;

		this.setState(() => {
			return {
				editItem: index
			};
		});
	};

	editPro = () => {
		let pro_id = document.querySelector('#vouch_pro_item').value;

		if (!pro_id) return;
		let vouch_quantity = document.querySelector('#vouch_quantity').value;
		let vouch_gst = document.querySelector('#vouch_gst').value;
		let vouch_rate = document.querySelector('#vouch_rate').value;
		let pro_name = this.state.products.find((o) => {
			return o.id == pro_id;
		});

		let arr = this.state.items;

		arr[this.state.editItem].pro_id = pro_id;
		arr[this.state.editItem].product_name = pro_name.product_name;
		arr[this.state.editItem].quantity = vouch_quantity;
		arr[this.state.editItem].gst = vouch_gst;
		arr[this.state.editItem].rate = vouch_rate;

		this.setState(() => {
			return {
				items: arr,
				editItem: -1
			};
		});
	};

	filterPro = () => {
		document.getElementById('pro_list').style.display = 'block';
		let temp = document.getElementById('vouch_pro_item').value.toLowerCase();

		let arr = this.state.products.filter((e) => {
			if (temp === '*') {
				return true;
			}
			if (e.product_name.toLowerCase().indexOf(temp) != -1) {
				return true;
			} else return false;
		});

		console.log(arr);
		if (temp == '') {
			this.setState({ pro: [] });
		} else {
			this.setState({ pro: arr });
		}
	};

	getProducts() {
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
							products: data.Products
						};
					});
				}
			})
			.catch((err) => {
				// alert(err)
			});
	}
	getAccounts() {
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
	}
	crossPro = () => {
		this.setState({ addPro: false });
	};

	selectAllText = () => {
		document.getElementById('vouch_pro_item').select();
	};

	constructor(props) {
		super(props);
		this.vochAddPro = this.vochAddPro.bind(this);
		this.getProducts = this.getProducts.bind(this);
		this.getAccounts = this.getAccounts.bind(this);

		this.state = {
			products: [],
			accounts: [],
			items: [],
			editItem: -1,
			totalAmt: 0,
			pro: [],
			addPro: false,
			NewProName: null
		};
		this.getProducts();
		this.getAccounts();
	}

	componentDidMount() {
		let today = new Date();

		document.getElementById('vouch_bill_date').valueAsDate = today;
		document.getElementById('pro_list').style.display = 'none';
	}
	render() {
		return (
			<div className="add_vouch_con">
				{this.state.addPro && (
					<AddProducts
						AddProCrossBtn={this.crossPro}
						getProducts={this.getProducts}
						mode={'add_new'}
						name={this.state.NewProName}
					/>
				)}
				<div className="add_pro_head">
					<h1>Add Purchase Voucher</h1>

					<div className="add_vouch_right_btns">
						<p
							onClick={() => {
								this.addVouch();
							}}
						>
							Save
						</p>
						<p>Reset</p>
						<img onClick={this.props.rm} src={cross} alt="" />
					</div>
				</div>

				<div className="vouch_body">
					<div className="vouch_body_left">
						<div className="vouch_body_left_top">
							<form action="/api/vouch" id="vouch_det" method="post">
								<div className="vouch_details">
									<div className="vouch_si">
										<span>Bill Date</span>
										<br />
										<input type="date" name="vouch_bill_date" id="vouch_bill_date" />
									</div>
									<div className="vouch_si">
										<span>Type</span>
										<br />
										<select name="vouch_type" id="vouch_type">
											<option value="option1">Purchase</option>
											<option value="option1">Purchase</option>
											<option value="option1">Purchase</option>
										</select>
									</div>

									<div className="vouch_si">
										<span>Bill No.</span>
										<br />
										<input type="number" name="vouch_bill_no" id="vouch_bill_no" />
									</div>

									<div className="vouch_si">
										<span>G. R. No.</span>
										<br />
										<input type="number" name="vouch_gr_no" id="vouch_gr_no" />
									</div>

									<div className="vouch_si">
										<span>Transport Name</span>
										<br />

										<input type = "text" placeholder = "Enter Name" id = "vouch_transport_name" />
									</div>

									<div className="vouch_si">
										<span>Supplier</span>
										<br />
										<select name="vouch_sup" id="vouch_sup">
											{this.state.accounts &&
												this.state.accounts.map((acc, i) => {
													if (acc.acc_type === 'creditors' || acc.acc_type === 'debtors') {
														return (
															<option key={i} value={acc.acc_name}>
																{acc.acc_name}
															</option>
														);
													} else {
														return null;
													}
												})}
										</select>
									</div>

									<div className="vouch_si">
										<span>Supplier Agent</span>
										<br />
										<select name="vouch_sup_agent" id="vouch_sup_agent">
											{this.state.accounts &&
												this.state.accounts.map((acc, i) => {
													if (acc.acc_type === 'agent') {
														return (
															<option key={i} value={acc.acc_name}>
																{acc.acc_name}
															</option>
														);
													} else {
														return null;
													}
												})}
										</select>
									</div>

									<div className="vouch_si">
										<span>Set Commission</span>
										<br />
										<input
											type="number"
											name="vouch_comission"
											id="vouch_comission"
											defaultValue="1"
										/>
									</div>
								</div>

								<div className="vouch_customer">
									<div className="vouch_si">
										<span>Customer</span>
										<br />
										<select name="customer" id="vouch_customer">
											{this.state.accounts &&
												this.state.accounts.map((acc, i) => {
													if (acc.acc_type === 'creditors' || acc.acc_type === 'debtors') {
														return (
															<option key={i} value={acc.acc_name}>
																{acc.acc_name}
															</option>
														);
													} else {
														return null;
													}
												})}
										</select>

										<span
											style={{ marginLeft: '20px', cursor: 'pointer' }}
											onClick={() => {
												alert('to do : add sub Agent');
											}}
										>
											{' '}
											+ Add Sub Agent
										</span>
									</div>
								</div>
							</form>
						</div>

						<div className="vouch_body_middle">
							<div className="vouch_si" id="vouch_pro_con">
								<span>Product / Item</span>
								<br />
								<input
									name="vouch_pro_item"
									id="vouch_pro_item"
									onChange={this.filterPro}
									onFocus={this.selectAllText}
									autoComplete="off"
								/>
								<ul id="pro_list">
									{this.state.pro.map((pro, index) => {
										return (
											<li
												key={index}
												onClick={() => {
													document.getElementById('vouch_pro_item').value = pro.product_name;
													document.getElementById('pro_list').style.display = 'none';
												}}
											>
												{pro.product_name}
											</li>
										);
									})}
								</ul>
							</div>

							<div className="vouch_si">
								<span>Quantity</span>
								<br />
								<input type="number" name="vouch_quantity" id="vouch_quantity" defaultValue="1" />
							</div>
							<div className="vouch_si">
								<span>Rate</span>
								<br />
								<input type="number" name="vouch_rate" id="vouch_rate" defaultValue="1" />
							</div>
							<div className="vouch_si">
								<span>GST</span>
								<br />
								<input type="number" name="vouch_gst" id="vouch_gst" defaultValue="18" />
							</div>
							<div className="vouch_si">
								<button
									id="vouch_add_btn"
									onClick={this.state.editItem === -1 ? this.vochAddPro : this.editPro}
								>
									{this.state.editItem === -1 ? 'Add' : 'Edit'}
								</button>
							</div>
						</div>

						<div className="vouch_table_con">
							<table id="vouch_table">
								<thead>
									<tr>
										<th>S.No.</th>
										<th>Product/Item</th>
										<th>Quantity</th>
										<th>Rate</th>

										<th>Amount</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.state.items.map((i, index) => {
										return (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{i.product_name}</td>
												<td>{i.quantity}</td>
												<td>{i.rate}</td>

												<td>{i.amount}</td>
												<td
													className="tbtn"
													onClick={() => {
														this.editItem(index);
													}}
												>
													<span>Edit</span>
												</td>
												<td
													className="tbtn"
													onClick={() => {
														this.removeItem(index);
													}}
												>
													<span>X</span>
												</td>
											</tr>
										);
									})}
									{this.state.items.length === 0 && (
										<tr>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									)}
									{this.state.items.length < 2 && (
										<tr>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									)}
									{this.state.items.length < 3 && (
										<tr>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									)}
									{this.state.items.length < 4 && (
										<tr>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									)}
									{this.state.items.length < 5 && (
										<tr>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									)}
									{this.state.items.length < 6 && (
										<tr>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

					<div className="vouch_body_right">
						<div className="right items vouch_body">
							<div className = "vouch_num_items">
								<span>No. of items</span>
								<br />
								<span><input type = "text" id = "vouch_items_num" /></span>
							</div>
							<div className = "vouch_types_item">
								<span>Type of items</span>
								<br />
								<span><input type = "text" id = "vouch_items_type" /></span>
						     </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddVouch;
