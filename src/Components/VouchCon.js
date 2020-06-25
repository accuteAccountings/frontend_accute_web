import React from 'react';
import Delete from '../Components/Delete';
import AddVouch from '../Components/AddVouch';
import AddAcc from '../Components/AddAcc';
import ref from './../img/refresh.svg';
import trash from '../img/trash.svg'
import pencil from '../img/pencil.svg'

class VouchCon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			addVouch: false,
			addDebit: false,
			data: []
		};
		this.updateData();
	}
	updateData = () => {
		fetch('/api/vouch').then((res) => res.json()).then((data) => {
			console.log(data);
			this.setState(() => {
				return {
					data: data
				};
			});
		});
	};

	render() {
		return (
			<div>
				<div className="nav_sec">
					<div className="nav_items">
						<li
							className={this.props.vouchPage === 'pv' ? 'black' : 'grey'}
							onClick={() => {
								this.updateData();
								this.props.setVouchPage('pv');
							}}
						>
							Purchase Vouchers
						</li>
						<li
							className={this.props.vouchPage === 'jv' ? 'black' : 'grey'}
							onClick={() => {
								this.updateData();

								this.props.setVouchPage('jv');
							}}
						>
							Journal Vouchers
						</li>
						<li
							className={this.props.vouchPage === 'dn' ? 'black' : 'grey'}
							onClick={() => {
								this.updateData();

								this.props.setVouchPage('dn');
							}}
						>
							Debit Note
						</li>
					</div>
					<div className="other_det">
					<div
						className="add_account"
						onClick={
							this.props.vouchPage === 'pv' ? (
								() => {
									this.props.setPVoJVoDN('pv');
								}
							) : (
								this.props.AddAccCrossBtn
							)
						}
					>
						+ Add {this.props.vouchPage === 'jv' && 'Journal Vouchers'}
						{this.props.vouchPage === 'pv' && 'Purchase Vouchers'}
						{this.props.vouchPage === 'dn' && 'Debit Note'}
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
					{this.props.vouchPage === 'pv' && (<div>
						{this.state.data.map((e) => {
							return (
								<Det_cont
									supplier = {e.supplier}
									costumer = {e.costumer}
									bill_num = {e.bill_num}
								/>
							)
						})}
						</div>
					)}
					{this.props.vouchPage === 'jv' && (<div>
						<Jo_vouch_det />
						</div>)}
					</div>
				</div>
			</div>
		);
	}
}

class Det_cont extends React.Component{
	render(){
		return(
			<div className = "det_cont_vouch">
				<div className = "det_cont_left vouc_det_left">
					<div className = "acc_name_vouch">
							<span className = "acc_id_vouch">1.  </span>
							Seller Name	
							<span className = "vouch_to">TO</span>
							<span className = "vouch_costumer_name">
							Costumer Name</span>
						</div>
					<div className = "vouch_bill_detail">
						<div className  ="acc_adress">
							<span className = "acc_adress_head">
								Amount :</span> 8979799</div>
							<div className  ="acc_adress">
							<span className = "acc_adress_head">
								Biil No :</span> 123456</div>
					</div>
				</div>
				<div className = "det_cont_right_vouch vouch_right">
					<div className = " vouch_status"><span className = "acc_right_vouch">Status:</span> UNPAID</div>
					<div className = "vouch_date"><span className = "acc_right_vouch"> Date:</span> {Date.now()}</div>
				</div>

				<div className = "det_cont_icons">
					<div onClick={() => {
						this.props.showAddAcc(this.props.id);
					}}>
						<img src = {pencil} alt = " " />
					</div>
					<div onClick={() => {
						this.props.deleteIt(`/api/accounts/${this.props.id}`);
					}}>
						<img src = {trash} alt = " " />
					</div>
				</div>
			</div>
		)
	}
}

class Jo_vouch_det extends React.Component {
	render(){
		return (
			<div className = "det_cont_vouch">
			
						<div className = "det_cont_right_vouch">
							<div className = " vouch_bills">
								<span className = "acc_id_vouch">1.  </span>
								<span className = "acc_right_vouch">Bills:</span> 1234 , 4563 , 45435</div>
							<div className = "acc_name_vouch jovouch_det">
								<span >Seller Name	</span>
								<span className = "vouch_to">TO</span>
								<span className = "vouch_costumer_name">
								Costumer Name</span>
							
							</div>
						</div>
						<div className = "det_cont_right_jovouch">
						<div className = " vouch_bills"><span className = "acc_right_vouch">Pending Amount:</span> 4543543</div>
						<div className = "vouch_bills"><span className = "acc_right_vouch"> Amount:</span> 4246445</div>
					</div>
					<div className = "det_cont_last_jovouch">
					<div className = " vouch_status"><span className = "acc_right_vouch">Status:</span> UNPAID</div>
					<div className = "vouch_date"><span className = "acc_right_vouch"> Date:</span> {Date.now()}</div>
				</div>
				<div className = "det_cont_icons">
					<div onClick={() => {
						this.props.showAddAcc(this.props.id);
					}}>
						<img src = {pencil} alt = " " />
					</div>
					<div onClick={() => {
						this.props.deleteIt(`/api/accounts/${this.props.id}`);
					}}>
						<img src = {trash} alt = " " />
					</div>
				</div>
			</div>
		)
	}
}


export default VouchCon;
