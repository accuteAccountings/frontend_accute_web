import React from "react";
import TaskManager from "containers/main/TaskManager";
import AgencyPage from "containers/main/AgencyPage";

export default class Agency extends React.Component {
  render() {
    return (
      <div className="agency">
        <AgencyPage />
        <TaskManager />
      </div>
    );
  }
}
