import React from 'react';
import Delete from '../Components/Delete';
import AddVouch from '../Components/AddVouch';
import AddAcc from '../Components/AddAcc';
import ref from './../img/refresh.svg';

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
					<div className="pro_con">
						<table id="accounting_pro_table">
							{this.props.vouchPage === 'jv' && (
								<tr>
									<th>S.No. </th>
									<th>Supplier Name</th>
									<th>Customer Name</th>
									<th>Bill No.</th>
									<th>G.R. No.</th>
									<th>Edit/View</th>
									<th>Delete</th>
								</tr>
							)}
							{this.props.vouchPage === 'pv' && (
								<tr>
									<th>S.No. pv</th>
									<th>Supplier Name</th>
									<th>Customer Name</th>
									<th>Bill No.</th>
									<th>G.R. No.</th>
									<th>Edit/View</th>
									<th>Delete</th>
								</tr>
							)}
							{this.props.vouchPage === 'dn' && (
								<tr>
									<th>S.No.dn </th>
									<th>Supplier Name</th>
									<th>Customer Name</th>
									<th>Bill No.</th>
									<th>G.R. No.</th>
									<th>Edit/View</th>
									<th>Delete</th>
								</tr>
							)}
							{this.props.vouchPage === 'pv' &&
								this.state.data.map((e, i) => {
									return (
										<tr key={i}>
											<th>{i + 1}</th>
											<th>{e.det.supplier}</th>
											<th>{e.det.customer}</th>
											<th>{e.det.bill_num}</th>
											<th>{e.det.g_r_num}</th>
											<th>
												<a href="">Edit/View</a>
											</th>
											<th>Delete</th>
										</tr>
									);
								})}
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default VouchCon;
