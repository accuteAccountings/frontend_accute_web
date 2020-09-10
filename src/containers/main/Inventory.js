import React from 'react'
import cross from 'assets/icons/cancel.svg';
import load from 'assets/icons/loading.svg';

export default class Inventory extends React.Component{

    getInventories = async() => {
        await fetch('/api/inventory').
        then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        invt : data
                    }
                })
            }
        })
    }

    filterInvt = async() => {
        
        this.setState(() => {
            return{
                ddown : true
            }
        })

        let temp = document.getElementById('inventory_pname').value.toLowerCase();

        let arr = this.state.invt.filter(e => {
        if (temp.length === 0) {
            return true;
        }
        if (e.ProductName.toLowerCase().indexOf(temp) !== -1) {
            return true;
        } else return false;
        });

        this.setState({ temp: arr });
    }

    constructor(props){
        super(props)

        this.getInventories()

        this.addInventory = this.addInventory.bind(this)

        this.state = {
            invt : [],
            add : false,
            pro_name : null,
            hsn : null,
            unit : null,
            category : null,
            edit : false,
            id : null,
            temp : [],
            pre_name : null
        }
    }

    crossHandler = () => {
        this.setState(() => {
            return{
                add : false,
                edit : false
            }
        })
    }

    addHandler = () => {
        this.setState(() => {
            return{
                add : true
            }
        })
    }

    editHandler = async(id) => {

        await fetch(`/api/inventory/specific?id=${id}`).
        then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        pro_name : data.ProductName,
                        hsn : data.HSN_Num,
                        unit : data.Units,
                        category : data.Category,
                        edit : true,
                        id : data.id,
                        ddown : false
                    }
                })
            }
        })

    }

    editInventory = () => {
        let data = {
            product_name : document.getElementById('inventory_pname').value,
            category : document.getElementById('inventory_category').value,
            units : document.getElementById('inventory_units').value,
            hsnNum : document.getElementById('inventory_hsn').value,
            id : this.state.id
        }

         fetch("/api/inventory", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }).then((res) => res.json())
          .then((data) => {
              if(data){
                 this.getInventories()
              }
          })

    }

    addInventory = async() => {
        let data = {
            product_name : document.getElementById('inventory_pname').value,
            category : document.getElementById('inventory_category').value,
            units : document.getElementById('inventory_units').value,
            hsnNum : document.getElementById('inventory_hsn').value
        }
       await fetch("/api/inventory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }).then((res) => res.json())
          .then((data) => {
              if(data == true){
                 this.getInventories()
              }
          })
    }

    render(){
        return(
            <div className = "inventory_fullPage">
            <div className="add_products">
                <div>
                    <button onClick = {this.addHandler}>Add Inventory</button>
                </div>
                { (this.state.add || this.state.edit) && (
                    <div>
                    <div className="overlay" />

                    <div className="add_pro_con">
                        <div className="add_pro_head">
                            <h1>Add Inventory</h1>
                        </div>

                        <div className="add_pro_body">
                            <div className="add_pro_name">
                                <span>Product Name</span>
                                <span className = "list_inpt_invt">
                                    
                                    <input
                                        readOnly={this.state.mode === 'view' && true}
                                        type="text"
                                        placeholder="Enter Product Name"
                                        id = "inventory_pname"
                                        value = {this.state.pro_name}
                                        onChange = {this.filterInvt}
                                        onFocus = {this.filterInvt}
                                    />
                                    { this.state.ddown && (
                                        <div className = "dp_list_invt">
                                        {this.state.temp.map((e) => {
                                            return(
                                                <div onClick = {() => {
                                                    this.setState(() => {
                                                        return{
                                                            ddown : false
                                                        }
                                                    })
                                                    document.getElementById('inventory_pname').value = e.ProductName
                                                }}>
                                                    {e.ProductName} , ({e.Category})
                                                </div>
                                            )
                                        })}
                                    </div>)}
                                </span>
                            </div>
                            <div className="add_pro_num">
                                <span>Category</span>

                                <input
                                    readOnly={this.state.mode === 'view' && true}
                                    placeholder="Enter HSN No."
                                    type="text"
                                    id = "inventory_category"
                                    value = {this.state.category}
                                />
                            </div>
                            <div className="add_pro_num">
                                <span>Units</span>

                                <input
                                    readOnly={this.state.mode === 'view' && true}
                                    placeholder="Enter HSN No."
                                    type="text"
                                    id = "inventory_units"
                                    defaultValue = {this.state.unit}
                                />
                            </div>

                            <div className="add_pro_num">
                                <span>HSN No.</span>

                                <input
                                    readOnly={this.state.mode === 'view' && true}
                                    placeholder="Enter HSN No."
                                    type="text"
                                    id = "inventory_hsn"
                                    value = {this.state.hsn}
                                />
                            </div>

                            <div className="two_items" id="add_pro_btns">
                                <button className="add_pro_can_btn" onClick={this.crossHandler}>
                                    Cancel
                                </button>

                                <button
                                    className="add_pro_btn"
                                    onClick={
                                        () => {
                                            if(this.state.add){
                                                this.addInventory()
                                            }else{
                                                this.editInventory()
                                            }
                                            this.crossHandler()
                                        }
                                    }
                                >
                                    Save
                                </button>
                                    </div>
                            </div>
                        </div>
                        </div>
                )
                    }
                </div>
                <div className = "inventory_page">
                    <div className = "top_invt_heading">
                        <div className = "pro_invt">Product</div>
                        <div className = "cat_invt">Category</div>
                        <div className = "status_invt_heading">Status</div>
                        <div className = "unit_invt">Units</div>
                        <div className = "hsn_invt">HSN No.</div>
                        <div className = "action_invt_heading">Actions</div>
                    </div>
                    {this.state.invt.map((e,i) => {
                        return(
                            <div className = {i%2 == 0 ? 'top_grey_invt' : 'top_invt'}>
                                <div className = "pro_invt">{e.ProductName}</div>
                                <div className = "cat_invt">{e.Category}</div>
                                <div className = "status_invt">
                                    <div className = "status_val">
                                        In Stock
                                    </div>
                                </div>
                                <div className = "unit_invt">{e.Units}</div>
                                <div className = "hsn_invt">{e.HSN_Num}</div>
                                <div className = "action_invt">
                                    <span>Activity Log</span>
                                    <span>|</span>
                                    <span onClick = {() => this.editHandler(e.id)}>Edit</span>
                                    <span>|</span>
                                    <span>View</span>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}

