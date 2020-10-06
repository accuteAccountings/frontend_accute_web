import React from "react";
import { useParams } from "react-router-dom";
import Dashboard from './Dash';
import Accounting from '../containers/main/Accounting';
import Transactions from '../containers/main/Transactions';
import Reports from '../containers/main/Reports';
import TopBar from "containers/main/TopBar";
import Agency from '../pages/Agency';

const MainPageMenuItem = ({ id: item = "dashboard" }) => {
  const { id = item } = useParams();
  const data = {
    "dashboard": {   
      main: <Dashboard/>     
    },
    "accounting": {
      main: <Accounting/>
    },
    "transactions":{
       main:<Transactions/>
    },
    "reports":{
       main:<Reports/>
    },
    "agency": {
        main: (
            <div className="pageBody">
            <TopBar />
            <Agency />
            </div>
          )
    },
  };

  return data && data[id] ? (
    <div>
     {data[id].main}
    </div>
  ) : null;
};

export default MainPageMenuItem;