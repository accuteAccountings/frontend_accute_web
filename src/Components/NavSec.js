import React from 'react';
import ref from './../img/refresh.svg';

class NavSec extends React.Component {
	render() {
		return (
			<div className={this.props.ProOrAcc === 'Products' ? 'nav_sec_pro' : 'nav_sec'}>
				<div className="nav_items">
					{this.props.navItems &&
						this.props.navItems.map((item) => {
							return (
								<li
									className={this.props.ProOrAcc === item ? 'black' : 'grey'}
								id={item === "Products" && "borderNone"}
									onClick={() => {
										this.props.setProOrAcc(item);
									}}
								>
									{item}
								</li>
							);
						})}
				</div>

				<div className={this.props.ProOrAcc === 'Products' ? 'other_det_pro' : 'other_det'}>
					<div
						className="add_account"
						onClick={
							this.props.ProOrAcc === 'Products' ? this.props.AddProCrossBtn : this.props.AddAccCrossBtn
						}
					>
						+ Add {this.props.ProOrAcc === 'Products' ? 'Product' : 'Account'}
					</div>

					<img
						src={ref}
						alt=" "
						onClick={this.props.ProOrAcc === 'Products' ? this.props.getProducts : this.props.getAccounts}
					/>

					<input
						type="text"
						id="searchForProOrAcc"
						onChange={() => {
							this.props.fi();
						}}
					/>
				</div>
			</div>
		);
	}
}

export default NavSec;
