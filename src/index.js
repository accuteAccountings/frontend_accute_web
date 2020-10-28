import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import * as serviceWorker from "./serviceWorker";
import {PersistGate} from 'redux-persist/integration/react'
import "styles/index.scss";
import Routes from "./routes";
import {store , persistor} from './redux/store'
//test2
ReactDOM.render(
    <Provider store = {store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
  );

serviceWorker.unregister();
// window.onbeforeunload = function(e) {
// 	return 'Sure you want to leave?';
// };
// let sideMenu = true;
// document.getElementsByClassName("menu_btn")[0].onclick = () => {
//   if (sideMenu) {
//     document.getElementsByClassName("side_bar")[0].style.animationName = "hideSideMenu";
//     document.getElementsByClassName("side_bar_con")[0].style.animationName = "hideSideItems";

//     sideMenu = false;
//   } else {
//     document.getElementsByClassName("side_bar")[0].style.animationName = "showSideMenu";
//     document.getElementsByClassName("side_bar_con")[0].style.animationName = "showSideItems";
//     sideMenu = true;
//   }
// };
