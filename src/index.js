import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './Containers/App'
import './Styles/Styles.scss'



ReactDOM.render(

  <App />

  ,
  document.getElementById('root')
);

serviceWorker.unregister();

let sideMenu = true
document.getElementsByClassName('menu_btn')[0].onclick = () => {

  if (sideMenu) {
    document.getElementsByClassName('side_bar')[0].style.animationName = "hideSideMenu"
    document.getElementsByClassName('side_bar_con')[0].style.animationName = "hideSideItems"

    sideMenu = false

  }
  else {
    document.getElementsByClassName('side_bar')[0].style.animationName = "showSideMenu"
    document.getElementsByClassName('side_bar_con')[0].style.animationName = "showSideItems"
    sideMenu = true

  }
}
