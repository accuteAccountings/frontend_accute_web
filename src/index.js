import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './Containers/App';
// import AddJoVoucher from './Components/AddJoVouch'
import './Styles/Styles.scss';
import Printed_ledger from './Components/printed_ledger'

ReactDOM.render(<Printed_ledger />, document.getElementById('root'));

// serviceWorker.unregister();
// // window.onbeforeunload = function(e) {
// // 	return 'Sure you want to leave?';
// // };
// let sideMenu = true;
// document.getElementsByClassName('menu_btn')[0].onclick = () => {
// 	if (sideMenu) {
// 		document.getElementsByClassName('side_bar')[0].style.animationName = 'hideSideMenu';
// 		document.getElementsByClassName('side_bar_con')[0].style.animationName = 'hideSideItems';

// 		sideMenu = false;
// 	} else {
// 		document.getElementsByClassName('side_bar')[0].style.animationName = 'showSideMenu';
// 		document.getElementsByClassName('side_bar_con')[0].style.animationName = 'showSideItems';
// 		sideMenu = true;
// 	}
// };
