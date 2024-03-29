import React from "react";
import Modal from "react-modal";
import cross from "assets/icons/cancel.svg";
import search from "assets/icons/search.svg";

export default class Ledger extends React.Component {
	handleModal = () => {
		this.setState((prevState) => {
			return {
				open: !prevState.open,
			};
		});
	};
	enterPressed(event) {
		var code = event.keyCode || event.which;
		if (code === 13) {
			this.props.getDet();
		}
	}

	Ledger_Balance = (id) => {
		let num = 0;
		let arr = [];
		if (
			document.getElementById("filter_op") &&
			document.getElementById("filter_op").value === "date"
		) {
			num = id;
			arr = this.props.details;
		} else {
			num = this.props.details.length - 1 - parseInt(id);
			arr = this.props.details.slice(0, this.props.details.length).reverse();
		}
		let t = 0;
		arr.map((e, i) => {
			i <= num &&
				(e.credit_acc_id
					? e.credit_acc_id == this.props.account.id
						? (t = parseInt(t) + parseInt(e.amount - e.balance))
						: (t = parseInt(t) - parseInt(e.amount - e.balance))
					: e.customer_id == this.props.account.id
					? (t = parseInt(t) + parseInt(e.totalAmt))
					: (t = parseInt(t) - parseInt(e.totalAmt)));
		});
		return t;
	};

	TotalDebit = () => {
		fetch(`/api/ledger_balance/debited?supplier=${this.props.account.id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log('I am debit balance....', data)
				if (data.error) {
					alert(data.error);
				} else {
					this.setState(() => {
						return {
							debit: data.balance,
						};
					});
				}
			});
	};

	TotalCredit = () => {
		fetch(
			`/api/ledger_balance/credited?supplier=${this.props.account.id}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log('I am credit balance....', data)

				if (data.error) {
					alert(data.error);
				} else {
					this.setState(() => {
						return {
							credit: data.balance,
						};
					});
				}
			});
	};

	constructor(props) {
		super(props);

		this.TotalCredit();
		this.TotalDebit();
		this.state = {
			open: false,
			debit: 0,
			credit: 0,
		};
	}
	componentDidMount() {
		this.props.getDet();
	}
	render() {
		return (
			<div className="ledger_con">
				<div className="ledger_tab">
					<div className="acc_pro_ledger_upper">
						<div className="filters_ledger">
							<div className="upp_date">
								<div>
									<label for="ledger_date_start">From </label>
									<br />
									<input
										type="date"
										id="ledger_date_start"
										name="ledger_date_start"
										placeholder="From"
									/>
								</div>
								<div>
									<label for="ledger_date_end">To </label>
									<br />
									<input type="date" id="ledger_date_end" />
								</div>
								<div className="buttons_sec">
									<div className="search_date">
										<button onClick={this.props.getDet} className="btn_search">
											Search
										</button>
									</div>

									<div>
										<button
											onClick={this.props.clearall}
											className="btn_search"
										>
											Clear
										</button>
									</div>
								</div>
							</div>

							<div className="print_search">
								<div>
									<button
										onClick={() => {
											window.print();
										}}
										className="print_btn_ledger"
									>
										Print ledger
									</button>
								</div>
								<div>
									<input
										type="search"
										placeholder="Search Account/Bill No."
										id="search_filters"
										onChange={() => this.props.filter_al()}
									/>
								</div>
							</div>
						</div>

						<div className="ledger_upp_right_div">
							<div className="ledger_upp_right">
								<span className="upp_head">Debit : </span>
								{this.state.debit}
							</div>
							<div className="ledger_upp_right">
								<span className="upp_head">Credit : </span>
								{this.state.credit}
							</div>
							<div className="leger_upp_right">
								<span className="upp_head">Balance : </span>
								{parseInt(this.state.debit - parseInt(this.state.credit)) < 0
									? parseInt(this.state.credit) -
									  parseInt(this.state.debit) +
									  " (Cr.)"
									: parseInt(this.state.debit) -
									  parseInt(this.state.credit) +
									  " (Dr.)"}
							</div>
						</div>
					</div>

					<div className="between_led">
						<div className="sort">
							<span>Sort By</span>
							<select
								id="filter_op"
								defaultValue="recents"
								onChange={this.props.getDet}
							>
								<option value="recents">Newest First</option>
								<option value="date">Oldest First</option>
							</select>
						</div>
					</div>

					<div className="acc_pro_ledger print_table">
						<table className="acc_pro_table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Particulars</th>
									<th>Type</th>
									<th>Bill No.</th>
									<th>Debit</th>

									<th>Credit</th>
									<th>Balance</th>
								</tr>
							</thead>
							<tbody>
								{this.props.details.map((e, i) => {
									console.log("I m table data....", i, e.credit_acc_id, e.debit_acc_id, e.customer_id, e.supplier_id, this.props.account.id, e.credit_acc_id == this.props.account.id, e.supplier_id == this.props.account.id)
									return e.credit_acc_id ? (
										<tr className="tr_acc">
											<td className="td_date">{e.bill_date}</td>
											<td className="parti_td">
												{e.credit_acc_id == this.props.account.id
													? e.debit_acc
													: e.credit_acc}
											</td>
											<td>{e.type == 'jv' ? 'Payment' : 'Sales'}</td>
											<td>{e.billArr.join(" , ")}</td>
											<td className="td_dc">
												{e.credit_acc_id == this.props.account.id
													? "-"
													: e.amount - e.balance}
											</td>
											<td className="td_dc">
												{e.credit_acc_id == this.props.account.id
													? e.amount - e.balance
													: "-"}
											</td>
											<td>
												{parseInt(this.Ledger_Balance(i)) < 0
													? this.Ledger_Balance(i) + " (Dr.)"
													: this.Ledger_Balance(i) + " (Cr.)"}{" "}
											</td>
										</tr>
									) : (
										<tr className="tr_acc">
											<td className="td_date">{e.bill_date}</td>
											<td className="parti_td">
												{e.customer_id == this.props.account.id
													? e.supplier
													: e.customer}
											</td>
											<td>{e.type == 'jv' ? 'Payment' : 'Sales'}</td>
											<td>{e.bill_num}</td>
											<td className="td_dc">
												{e.supplier_id == this.props.account.id
													? e.totalAmt
													: "-"}
											</td>
											<td className="td_dc">
												{e.customer_id == this.props.account.id
													? e.totalAmt
													: "-"}{" "}
											</td>
											<td>
												{parseInt(this.Ledger_Balance(i)) < 0
													? this.Ledger_Balance(i) + " (Dr.)"
													: this.Ledger_Balance(i) + " (Cr.)"}{" "}
											</td>
										</tr>
									);
								})}

								<tr className="tr_acc">
									<td className="td_date"> </td>
									<td className="parti_td"> </td>
									<td></td>
									<td> </td>
									<td className="td_dc"> </td>
									<td className="td_dc"> </td>
									<td> </td>
								</tr>

								<tr className="tr_acc">
									<td className="td_date"> </td>
									<td className="parti_td"> </td>
									<td></td>
									<td> </td>
									<td className="td_dc"> </td>
									<td className="td_dc"> </td>
									<td> </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
