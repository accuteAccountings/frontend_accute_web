import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../Containers/App'
import Printed_ledger from '../Components/printed_ledger'

const Apiroute = () => (
	<BrowserRouter>
		<div>
			<Switch>
                <Route path = "/" component = {App} exact = {true}  />
                <Route path = "/printed" component = {Printed_ledger}  />
			</Switch>
		</div>
	</BrowserRouter>
);



export default Apiroute;
