import React from "react";
import load from "assets/icons/loading.svg";

class Delete extends React.Component {
  deleteThis = () => {
    this.setState(() => {
      return { loading: true };
    });

    fetch(this.props.deleteUrl, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deleted) {
          this.setState(() => {
            return { loading: false };
          });
          this.props.deleteHide();
        }
      })
      .catch(err => {
        alert(err);
        this.setState(() => {
          return { loading: false };
        });
      });
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <div className="Delete">
        <div className="overlay"></div>

        <div className="delete_con">
          <h3>Are you sure you want to delete ?</h3>

          <div className="delete_btn_con">
            <button className="add_pro_can_btn" onClick={this.props.deleteHide}>
              Cancel{" "}
            </button>
            <button className="add_pro_btn" onClick={this.deleteThis}>
              {this.state.loading ? <img src={load} className="loading" alt=" " /> : "Delete"}{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Delete;
