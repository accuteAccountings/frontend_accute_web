import React from 'react';
import cross from './../img/cancel.svg';

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
	addVouch() {
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
		postData('api/vouch', Vdata);
	}

	vochAddPro() {
		let pro_id = document.querySelector('#vouch_pro_item').value;

		if (!pro_id) return;
		let vouch_quantity = document.querySelector('#vouch_quantity').value;
		let vouch_gst = document.querySelector('#vouch_gst').value;
		let vouch_rate = document.querySelector('#vouch_rate').value;

		let pro_name = this.state.products.find((o) => {
			// eslint-disable-next-line
			return o.id == pro_id;
		});
		let item = {
			pro_id,
			product_name: pro_name.product_name,
			quantity: vouch_quantity,
			gst: vouch_gst,
			rate: vouch_rate
		};

		let arr = this.state.items;
		arr.push(item);

		this.setState((prevState) => {
			return {
				items: arr
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
			// eslint-disable-next-line
			return o.id == pro_id;
		});

		let arr = this.state.items;

		arr[this.state.editItem].pro_id = pro_id;
		arr[this.state.editItem].product_name = pro_name;
		arr[this.state.editItem].quantity = vouch_quantity;
		arr[this.state.editItem].gst = vouch_gst;
		arr[this.state.editItem].rate = vouch_rate;

		this.setState(() => {
			return {
				items: arr,
				editItem: false
			};
		});
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

	constructor(props) {
		super(props);
		this.vochAddPro = this.vochAddPro.bind(this);
		this.getProducts = this.getProducts.bind(this);
		this.getAccounts = this.getAccounts.bind(this);

		this.state = {
			products: [],
			accounts: [],
			items: [],
			editItem: 0
		};
		this.getProducts();
		this.getAccounts();
	}

	render() {
		return (
			<div className="add_vouch_con">
				<div className="add_pro_head">
					<h1>Add Purchase Voucher</h1>

					<div className="add_vouch_right_btns">
						<p>Save</p>
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
										<input type="text" name="vouch_transport_name" id="vouch_transport_name" />
									</div>

									<div className="vouch_si">
										<span>Supplier</span>
										<br />
										<select name="vouch_sup" id="vouch_sup">
											{this.state.accounts &&
												this.state.accounts.map((acc, i) => {
													return (
														<option key={i} value={acc.acc_name}>
															{acc.acc_name}
														</option>
													);
												})}
										</select>
									</div>

									<div className="vouch_si">
										<span>Supplier Agent</span>
										<br />
										<select name="vouch_sup_agent" id="vouch_sup_agent">
											{this.state.accounts &&
												this.state.accounts.map((acc, i) => {
													return (
														<option key={i} value={acc.acc_name}>
															{acc.acc_name}
														</option>
													);
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
													return (
														<option key={i} value={acc.acc_name}>
															{acc.acc_name}
														</option>
													);
												})}
										</select>

										<span
											style={{ marginLeft: '20px', cursor: 'pointer' }}
											onClick={() => {
												alert('to do : add sub Agent');
												this.addVouch();
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
							<div className="vouch_si">
								<span>Product / Item</span>
								<br />
								<select name="vouch_pro_item" id="vouch_pro_item">
									{this.state.products &&
										this.state.products.map((pro, index) => {
											return (
												<option key={index} id={index} value={pro.id}>
													{pro.product_name}
												</option>
											);
										})}
								</select>
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
									onClick={this.state.editItem ? this.editPro : this.vochAddPro}
								>
									{this.state.editItem ? 'Edit' : 'Add'}
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
										<th>GST</th>
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
												<td>{i.gst}</td>
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
						<div className="right items" />
					</div>
				</div>
			</div>
		);
	}
}

export default AddVouch;
