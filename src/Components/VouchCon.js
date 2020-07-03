import React from 'react';
import ref from './../img/refresh.svg';
import trash from '../img/trash.svg';
import pencil from '../img/pencil.svg';

class VouchCon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			addVouch: false,
			addDebit: false,
			data: [],
			Debitdata: [],
			Creditdata: []
		};
		this.updateVouchData();
		this.updateDebitData();
		this.updateCreditData();
	}
	updateVouchData = () => {
		fetch('/api/vouch').then((res) => res.json()).then((data) => {
			console.log(data);
			this.setState(() => {
				return {
					data: data
				};
			});
		});
	};
	updateDebitData = () => {
		fetch('/api/debit').then((res) => res.json()).then((data) => {
			this.setState(() => {
				return {
					Debitdata: data
				};
			});
		});
	};
	updateCreditData = () => {
		fetch('/api/credit').then((res) => res.json()).then((data) => {
			this.setState(() => {
				return {
					Creditdata: data
				};
			});
		});
	};
	render() {
		return (
			<div>
				<div className="nav_sec_trans">
					<div className="nav_items">
						<li
							className={this.props.vouchPage === 'pv' ? 'black' : 'grey'}
							onClick={() => {
								this.updateVouchData();
								this.props.setVouchPage('pv');
							}}
						>
							Purchase Vouchers
						</li>
						<li
							className={this.props.vouchPage === 'jv' ? 'black' : 'grey'}
							onClick={() => {
								this.props.setVouchPage('jv');
							}}
						>
							Journal Vouchers
						</li>
						<li
							className={this.props.vouchPage === 'dn' ? 'black' : 'grey'}
							onClick={() => {
								this.updateDebitData();
								this.props.setVouchPage('dn');
							}}
						>
							Debit Note
						</li>
						<li
							className={this.props.vouchPage === 'cn' ? 'black' : 'grey'}
							onClick={() => {
								this.updateCreditData();
								this.props.setVouchPage('cn');
							}}
						>
							Credit Note
						</li>
					</div>
					<div className="other_det">
						<div
							className="add_account"
							onClick={() => {
								this.props.setPVoJVoDN(this.props.vouchPage);
							}}
						>
							+ Add {this.props.vouchPage === 'jv' && 'Journal Vouchers'}
							{this.props.vouchPage === 'pv' && 'Purchase Vouchers'}
							{this.props.vouchPage === 'dn' && 'Debit Note'}
							{this.props.vouchPage === 'cn' && 'Credit Note'}
						</div>

						<img
							src={ref}
							alt=" "
							onClick={
								this.props.ProOrAcc === 'Products' ? this.props.getProducts : this.props.getAccounts
							}
						/>

						{/* <input
						type="text"
						id="searchForProOrAcc"
						onChange={() => {
							this.props.fi();
						}}
					/> */}
					</div>
				</div>

				<div className="pro_compo">
					<div className="pro_con_vouch">
						{this.props.vouchPage === 'pv' && (
							<div className="vouchCon">
								{this.state.data.map((e, i) => {
									return (
										<DetCont
											i={i + 1}
											supplier={e.det.supplier}
											costumer={e.det.customer}
											date={e.det.bill_date}
											amt={e.det.totalAmt}
											bill_num={e.det.bill_num}
										/>
									);
								})}
							</div>
						)}

						{this.props.vouchPage === 'dn' && (
							<div className="vouchCon">
								{this.state.Debitdata.map((e, i) => {
									return (
										<DetCont
											i={i + 1}
											supplier={e.det.supplier}
											costumer={e.det.customer}
											date={e.det.bill_date}
											amt={e.det.totalAmt}
											bill_num={e.det.bill_num}
										/>
									);
								})}
							</div>
						)}

						{this.props.vouchPage === 'cn' && (
							<div className="vouchCon">
								{this.state.Creditdata.map((e, i) => {
									return (
										<DetCont
											i={i + 1}
											supplier={e.det.supplier}
											costumer={e.det.customer}
											date={e.det.bill_date}
											amt={e.det.totalAmt}
											bill_num={e.det.bill_num}
										/>
									);
								})}
							</div>
						)}
						{this.props.vouchPage === 'jv' && (
							<div className="vouchCon">
								<JoVouchDet />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

class DetCont extends React.Component {
	render() {
		return (
			<div className="det_cont_vouch">
				<div className="det_cont_left vouc_det_left">
					<div className="acc_name_vouch">
						<span className="acc_id_vouch">{this.props.i}. </span>
						{this.props.supplier}
						<span className="vouch_to">TO</span>
						<span className="vouch_costumer_name">{this.props.costumer}</span>
					</div>
					<div className="vouch_bill_detail">
						<div className="acc_adress">
							<span className="acc_adress_head vouch_amount">Amount :</span> {this.props.amt}
						</div>
						<div className="acc_adress">
							<span className="acc_adress_head">Biil No :</span> {this.props.bill_num}
						</div>
					</div>
				</div>
				<div className="det_cont_right_vouch vouch_right">
					<div className=" vouch_status">
						<span className="acc_right_vouch">Status:</span> UNPAID
					</div>
					<div className="vouch_date">
						<span className="acc_right_vouch"> Date:</span> {this.props.date}
					</div>
				</div>

				<div className="det_cont_icons">
					<div
						onClick={() => {
							this.props.showAddAcc(this.props.id);
						}}
					>
						<img src={pencil} alt=" " />
					</div>
					<div
						onClick={() => {
							this.props.deleteIt(`/api/accounts/${this.props.id}`);
						}}
					>
						<img src={trash} alt=" " />
					</div>
				</div>
			</div>
		);
	}
}

class JoVouchDet extends React.Component {
	render() {
		return (
			<div className="det_cont_jovouch">
				<div className="det_cont_right_jovouch_m">
					<div className="vouch_bills">
						<span className="acc_id_vouch">1. </span>
						<span className="acc_right_vouch">Bills:</span> 1234 , 4563 , 45435
					</div>
					<div className="acc_name_jovouch jovouch_det">
						<span>Seller Name </span>
						<span className="vouch_to">TO</span>
						<span className="vouch_costumer_name">Costumer Name</span>
					</div>
				</div>
				<div className="det_cont_right_jovouch">
					<div className=" vouch_bills">
						<span className="acc_right_vouch">Pending Amount:</span> 4543543
					</div>
					<div className="vouch_bills">
						<span className="acc_right_vouch"> Amount:</span> 432432
					</div>
				</div>
				<div className="det_cont_last_jovouch">
					<div className=" vouch_status">
						<span className="acc_right_vouch">Status:</span> UNPAID
					</div>
					<div className="vouch_date">
						<span className="acc_right_vouch"> Date:</span> {Date.now()}
					</div>
				</div>
				<div className="det_cont_icons">
					<div
						onClick={() => {
							this.props.showAddAcc(this.props.id);
						}}
					>
						<img src={pencil} alt=" " />
					</div>
					<div
						onClick={() => {
							this.props.deleteIt(`/api/accounts/${this.props.id}`);
						}}
					>
						<img src={trash} alt=" " />
					</div>
				</div>
			</div>
		);
	}
}

export default VouchCon;
