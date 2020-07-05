import React from 'react';
import pencil from '../img/pencil.svg';
import back from '../img/camera-back.svg';

export default class Account_pro extends React.Component {
	getDet = async () => {
		let date = await document.getElementById('ledger_date').value;
		await fetch(`/api/vouch/specific/${this.props.account.acc_name}/${date}`)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					this.setState(() => {
						return {
							details: data
						};
					});
				}
			});
	};

	constructor(props) {
		super(props);
		this.state = {
			details: []
		};
	}

	render() {
		return (
			<div>
				<div className="acc_pro_location">
					<span>
						<img src={back} onClick={() => this.props.backToAcc()} />
					</span>
					accounting / accounts / account profile
				</div>
				<div className="acc_pro_body">
					<div className="acc_pro_sbar">
						<div className="acc_pro_img" />
						<div className="acc_pro_name">{this.props.account.acc_name}</div>
						<div className="sbar_list" id="sbar_list">
							<div
								className={this.props.acc_pro_val === 'acc_det' ? 'acc_det' : 'sbar_list_value'}
								onClick={() => {
									this.props.setAccProfile('acc_det');
								}}
							>
								Account Details
							</div>
							<div
								className={this.props.acc_pro_val === 'ledger' ? 'acc_det' : 'sbar_list_value'}
								onClick={() => {
									this.props.setAccProfile('ledger');
								}}
								id="ledger"
							>
								Ledger
							</div>
							<div
								className={this.props.acc_pro_val === 'reports' ? 'acc_det' : 'sbar_list_value'}
								onClick={() => this.props.setAccProfile('reports')}
								id="reports"
							>
								Reports
							</div>
						</div>
					</div>

					{this.props.acc_pro_val === 'acc_det' && (
						<div className="acc_pro_right">
							<div className="acc_pro_right_upper">
								<div className="acc_pro_right_name">
									{this.props.account.acc_name}
									<span className="acc_pro_right_pname">({this.props.account.print_name})</span>
								</div>
								<div className="acc_pro_right_add">{this.props.account.address_line1}</div>
							</div>
							<div className="acc_pro_right_lower">
								<div className="acc_pro_right_heading">
									<div>BASIC DETAILS</div>
									<div className="acc_pro_right_edit">
										<img src={pencil} />
									</div>
								</div>
								<div className="acc_pro_right_details">
									<div className="acc_pro_detail_heading">
										<span>Phone</span>
										<br />
										<span className="acc_pro_details_value">
											{this.props.account.mob_num}

											<span className="acc_pro_details_bvalue">(Mobile)</span>
										</span>
										<span className="acc_pro_details_value">
											{this.props.account.phone_num}

											<span className="acc_pro_details_bvalue">(Office)</span>
										</span>
									</div>
									<div className="acc_pro_detail_heading">
										<span>Email</span>
										<br />
										<span className="acc_pro_details_value">{this.props.account.emailId}</span>
									</div>
									<div className="acc_pro_detail_last">
										<div className="acc_pro_detail_heading">
											Pan No.
											<br />
											<span className="acc_pro_details_value">{this.props.account.pan_num}</span>
										</div>
										<div className="acc_pro_detail_heading">
											GST No.
											<br />
											<span className="acc_pro_details_value">{this.props.account.gst_num}</span>
										</div>
										<div className="acc_pro_detail_heading">
											Adhaar No.
											<br />
											<span className="acc_pro_details_value">
												{this.props.account.aadhar_num}
											</span>
										</div>
									</div>
								</div>
								<div>
									<div className="right_lower_heading">BANKING DETAILS</div>
									<div className="acc_pro_detail_last_lowr">
										<div className="acc_pro_detail_heading">
											Account No.
											<br />
											<span className="acc_pro_details_value" />
										</div>
										<div className="acc_pro_detail_heading">
											Bank Name , Branch
											<br />
											<span className="acc_pro_details_value">
												State Bnak of India , karnal haryana
											</span>
										</div>
										<div className="acc_pro_detail_heading">
											IIFC Code
											<br />
											<span className="acc_pro_details_value">BTVPN9211R</span>
										</div>
										<div className="acc_pro_detail_heading">
											Remarks
											<br />
											<span className="acc_pro_details_value">BTVPN9211R</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{this.props.acc_pro_val === 'ledger' && (
						<div className="ledger_tab">
							<div className="acc_pro_ledger_upper">
								<div className="upp_date">
									<input type="month" id="ledger_date" name="ledger_date" />
									<button onClick={this.getDet}>search</button>
								</div>
								<div className="ledger_upp_right_div">
									<div className="leger_upp_right">
										<span className="upp_head">Debit : </span>
										45465465
									</div>
									<div className="leger_upp_right">
										<span className="upp_head">Credit : </span>
										45465465
									</div>
									<div className="leger_upp_right">
										<span className="upp_head">Balance : </span>
										{this.props.account.bal}
									</div>
								</div>
							</div>
							<div className="acc_pro_ledger">
								<table className="acc_pro_table">
									<thead>
										<tr>
											<th>S.No.</th>
											<th>Date</th>
											<th>Particulars</th>
											<th>Bill No.</th>
											<th>Debit</th>

											<th>Credit</th>
											<th>Balance</th>
										</tr>
									</thead>
									<tbody>
										{this.state.details.map((e, i) => {
											return (
												<tr className="tr_acc">
													<td>{i + 1}</td>
													<td>{e.bill_date}</td>
													<td>{e.customer}</td>
													<td>{e.bill_num}</td>
													<td>{e.type == 'debit' ? e.totalAmt : '-'}</td>
													<td>{e.type == 'credit' ? e.totalAmt : '-'} </td>
													<td>{e.Bal_left} </td>
												</tr>
											);
										})}

										<tr className="tr_acc">
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
										<tr className="tr_acc">
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>

										{this.state.details.length > 4 && (
											<tr className="tr_acc">
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
											</tr>
										)}

										{this.state.details.length > 7 && (
											<tr className="tr_acc">
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
											</tr>
										)}

										{this.state.details.length > 8 && (
											<tr className="tr_acc">
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
												<td> </td>
											</tr>
										)}

										<tr className="tr_acc">
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
											<td> </td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
async function postData(url = '', data) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			// 'Content-Type': 'multipart/form-data'
			// 'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer'
	});
	return response.json(); // parses JSON response into native JavaScript objects
}
