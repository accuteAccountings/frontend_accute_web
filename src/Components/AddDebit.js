import React from 'react';
import cross from './../img/cancel.svg';

class AddDebit extends React.Component {
	debitAddPro() {
		let pro_id = document.querySelector('#Debit_pro_item').value;

		if (!pro_id) return;
		let Debit_quantity = document.querySelector('#Debit_quantity').value;
		let Debit_gst = document.querySelector('#Debit_gst').value;
		let Debit_rate = document.querySelector('#Debit_rate').value;

		let pro_name = this.state.products.find((o) => {
			// eslint-disable-next-line
			return o.id == pro_id;
		});
		let item = {
			pro_id,
			product_name: pro_name.product_name,
			quantity: Debit_quantity,
			gst: Debit_gst,
			rate: Debit_rate
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
		let pro_id = document.querySelector('#Debit_pro_item');

		let Debit_quantity = document.querySelector('#Debit_quantity');
		let Debit_gst = document.querySelector('#Debit_gst');
		let Debit_rate = document.querySelector('#Debit_rate');

		pro_id.value = this.state.items[index].pro_id;
		Debit_quantity.value = this.state.items[index].quantity;
		Debit_gst.value = this.state.items[index].gst;
		Debit_rate.value = this.state.items[index].rate;

		this.setState(() => {
			return {
				editItem: index
			};
		});
	};

	editPro = () => {
		let pro_id = document.querySelector('#Debit_pro_item').value;

		if (!pro_id) return;
		let Debit_quantity = document.querySelector('#Debit_quantity').value;
		let Debit_gst = document.querySelector('#Debit_gst').value;
		let Debit_rate = document.querySelector('#Debit_rate').value;
		let pro_name = this.state.products.find((o) => {
			// eslint-disable-next-line
			return o.id == pro_id;
		});

		let arr = this.state.items;

		arr[this.state.editItem].pro_id = pro_id;
		arr[this.state.editItem].product_name = pro_name;
		arr[this.state.editItem].quantity = Debit_quantity;
		arr[this.state.editItem].gst = Debit_gst;
		arr[this.state.editItem].rate = Debit_rate;

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
		this.debitAddPro = this.debitAddPro.bind(this);
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
			<div className="add_Debit_con">
				<div className="add_pro_head">
					<h1>Add Purchase Debiter</h1>

					<div className="add_Debit_right_btns">
						<p>Save</p>
						<p>Reset</p>
						<img onClick={this.props.AddProCrossBtn} src={cross} alt="" />
					</div>
				</div>

				<div className="Debit_body">
					<div className="Debit_body_left">
						<div className="Debit_body_left_top">
							<div className="Debit_details">
								<div className="Debit_si">
									<span>Bill Date</span>
									<br />
									<input type="date" name="Debit_bill_date" id="Debit_bill_date" />
								</div>
								<div className="Debit_si">
									<span>Type</span>
									<br />
									<select name="Debit_type" id="Debit_type">
										<option value="option1">Purchase</option>
										<option value="option1">Purchase</option>
										<option value="option1">Purchase</option>
									</select>
								</div>

								<div className="Debit_si">
									<span>Bill No.</span>
									<br />
									<input type="number" name="Debit_bill_no" id="Debit_bill_no" />
								</div>

								<div className="Debit_si">
									<span>G. R. No.</span>
									<br />
									<input type="number" name="Debit_gr_no" id="Debit_gr_no" />
								</div>

								<div className="Debit_si">
									<span>Transport Name</span>
									<br />
									<input type="text" name="Debit_transport_name" id="Debit_transport_name" />
								</div>

								<div className="Debit_si">
									<span>Supplier</span>
									<br />
									<select name="Debit_sup" id="Debit_sup">
										{this.state.accounts &&
											this.state.accounts.map((acc, i) => {
												return (
													<option key={i} value={acc.id}>
														{acc.acc_name}
													</option>
												);
											})}
									</select>
								</div>

								<div className="Debit_si">
									<span>Supplier Agent</span>
									<br />
									<select name="Debit_sup_agent" id="Debit_sup_agent">
										{this.state.accounts &&
											this.state.accounts.map((acc, i) => {
												return (
													<option key={i} value={acc.id}>
														{acc.acc_name}
													</option>
												);
											})}
									</select>
								</div>

								<div className="Debit_si">
									<span>Set Commission</span>
									<br />
									<input type="number" name="Debit_comission" id="Debit_comission" defaultValue="1" />
								</div>
							</div>

							<div className="Debit_customer">
								<div className="Debit_si">
									<span>Customer</span>
									<br />
									<select name="Debit_sup_agent" id="Debit_sup_agent">
										{this.state.accounts &&
											this.state.accounts.map((acc, i) => {
												return (
													<option key={i} value={acc.id}>
														{acc.acc_name}
													</option>
												);
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
						</div>

						<div className="Debit_body_middle">
							<div className="Debit_si">
								<span>Product / Item</span>
								<br />
								<select name="Debit_pro_item" id="Debit_pro_item">
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

							<div className="Debit_si">
								<span>Quantity</span>
								<br />
								<input type="number" name="Debit_quantity" id="Debit_quantity" defaultValue="1" />
							</div>
							<div className="Debit_si">
								<span>Rate</span>
								<br />
								<input type="number" name="Debit_rate" id="Debit_rate" defaultValue="1" />
							</div>
							<div className="Debit_si">
								<span>GST</span>
								<br />
								<input type="number" name="Debit_gst" id="Debit_gst" defaultValue="18" />
							</div>
							<div className="Debit_si">
								<button
									id="Debit_add_btn"
									onClick={this.state.editItem ? this.editPro : this.debitAddPro}
								>
									{this.state.editItem ? 'Edit' : 'Add'}
								</button>
							</div>
						</div>

						<div className="Debit_table_con">
							<table id="Debit_table">
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

					<div className="Debit_body_right">
						<div className="right items" />
					</div>
				</div>
			</div>
		);
	}
}

export default AddDebit;
