import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import ref from "assets/icons/refresh.svg";
import {ReactComponent as SearchLogo} from '../../assets/icons/search.svg';

class NavSec extends React.Component {
 
  render() {
    return (
      <div className="nav_sec">
        <div className="nav_items">
          {this.props.navItems &&
            this.props.navItems.map(item => {
              return (
                <li
                  className={this.props.ProOrAcc === item ? "black" : "grey"}
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

        <div className="other_det">

          <Button variant="outlined"  onClick={this.props.ProOrAcc === "Products" ? this.props.AddProCrossBtn : this.props.AddAccCrossBtn}>
          + Add {this.props.ProOrAcc === "Products" ? "Product" : "Account"}
          </Button>
          <img
            src={ref}
            onClick={this.props.ProOrAcc === "Products" ? this.props.getProducts : this.props.getAccounts}
            alt=" "
          />
          <TextField
            id="searchForProOrAcc"
            onChange={() => {
              this.props.fi();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchLogo />
                </InputAdornment>
                ),
            }}
           />
           <FormControl>
              <InputLabel style={{fontSize:"0.9em"}}>Sort By</InputLabel>
              <Select
                id="new_old_navsec"
               
                onChange={() => {
                  this.props.Sorting_Pro();
                }}
                input={<Input />}
              >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  
              </Select>
           </FormControl>
        </div>     
      </div>
    );
  }
}

export default NavSec;
