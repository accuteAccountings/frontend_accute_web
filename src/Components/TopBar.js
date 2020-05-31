import React from 'react';
import MenuBtn from './../img/menu.svg';
// import help from './../img/info.svg'
// import settings from './../img/settings.svg'
import arrow from './../img/multimedia.svg';

class TopBar extends React.Component {
	logout() {
		fetch('/api/login', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(() => {
				window.location.href = '/home';
			})
			.catch((error) => {
				alert(error);
			});
	}

	componentDidMount() {
		let ison = false;
		let pro_btn = document.getElementsByClassName('profile_btn')[0];
		let pro_drop = document.getElementsByClassName('profile_drop_down')[0];
		let ar = document.getElementById('arrow');

		pro_btn.addEventListener('click', () => {
			if (ison) {
				pro_drop.style.display = 'none';
				ar.style.transform = 'rotateZ(0deg)';

				ison = false;
			} else {
				pro_drop.style.display = 'block';
				ar.style.transform = 'rotateZ(180deg)';
				ison = true;
			}
		});
	}

	render() {
		let margin = {
			marginBottom: '50px'
		};

		return (
			<div className="top_bar" style={margin}>
				<img className="menu_btn" src={MenuBtn} alt="" />

				<li className="top_btns profile_btn">
					Hello , Tushar{' '}
					<span>
						<img id="arrow" src={arrow} alt="?" />
					</span>{' '}
				</li>
				<div className="profile_drop_down">
					<div>
						<li>User Profile</li>
						<li>Company Profile</li>
						<li>Subscriptions & Billings</li>
						<li>Manage Users</li>
					</div>
					<div id="pro_drop_lower">
						<li>Support</li>
						<li>Settings</li>
						<li>Privacy Policy</li>
						<li onClick={this.logout}>Sign Out</li>
					</div>
				</div>

				{/* <li className="top_btns help_btn" onClick={this.logout}><span><img src={help} alt="?" /></span> Help</li>
                <li className="top_btns settings_btn"> <span><img src={settings} alt="" /></span> Settings</li> */}
			</div>
		);
	}
}

TopBar.defaultProps = {
	margin: '5px'
};

export default TopBar;
