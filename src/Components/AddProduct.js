import React from 'react'
import cross from './../img/cancel.svg'
import load from './../img/loading.svg'

class AddProducts extends React.Component {


    setValue = ()=>{

        document.querySelector(".add_pro_inp_name").value = this.props.data.product_name
        document.querySelector(".add_pro_inp_num").defaultValue = this.props.data.hsn_num
    }
  

    addProSaveBtn(){

        this.setState(()=>{
            return {
                loading : true
            }
        })

        let pro_name = document.querySelector(".add_pro_inp_name").value
        let hsn_num = document.querySelector(".add_pro_inp_num").value
        
        let data = {
            product_name:pro_name,
            hsn_num : hsn_num,
            id:this.props.data.id
        }

        let met ;
        this.props.mode === "edit" ? met = "PUT" : met = "POST"


        fetch('/api/products', {
            method: met  , // *GET, POST, PUT, DELETE, etc.
          
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
          .then(res=> res.json())
          .then(r =>{
              if(r.product){
                this.setState(()=>{
                    return {
                        loading : false
                    }
                })
                this.props.getProducts()
                this.props.AddProCrossBtn()

              }
              else {
                  alert("Unable to save products, Please Try again later")
                this.props.AddProCrossBtn()
                this.setState(()=>{
                    return {
                        loading : false
                    }
                })

              }
          })
          .catch((err)=>{
              alert(err)
              this.props.AddProCrossBtn()
              this.setState(()=>{
                return {
                    loading : false
                }
            })

          })
    }



    constructor(props){
        super(props)
        this.addProSaveBtn = this.addProSaveBtn.bind(this)
        this.state={
            loading:false
        }

        if(this.props.mode ==="edit"){
            
        }


    }

    componentDidMount(){

        this.setValue()
    }


    render() {

        

        return (

            <div className="add_products">

                <div className="overlay"></div>

                <div className="add_pro_con">


                    <div className="add_pro_head">
                        <h1>Add Products</h1>
                        <img onClick={this.props.AddProCrossBtn} src={cross} alt=" " />
                    </div>

                    <div className="add_pro_body">

                        <div className="add_pro_name">

                            <span>Product Name</span>
                            <input className="add_pro_inp_name" 
                             type="text" placeholder="Enter Product Name" />

                        </div>
                        <div className="add_pro_num">

                            <span>HSN No.</span>

                            <input className="add_pro_inp_num"
                             placeholder="Enter HSN No." type="text" />


                        </div>

                        <div className="two_items" id="add_pro_btns">
                            <button className="add_pro_can_btn" onClick={this.props.AddProCrossBtn}>Cancel</button>

                            <button className="add_pro_btn" 
                            onClick={this.state.loading ? 
                            null
                            :this.addProSaveBtn}>
                            
                            {this.state.loading ? <img src={load} className="loading" alt=" "/> : "Save"}
                            </button>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}

AddProducts.defaultProps = {
    mode : "add"
}

export default AddProducts