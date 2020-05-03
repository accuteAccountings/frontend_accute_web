import React from 'react'
import Delete from '../Components/Delete'
import AddProducts from '../Components/AddProduct'
import AddAcc from '../Components/AddAcc'

class ProCon extends React.Component {

    deleteHide = ()=>{
        this.setState(()=>{
            return {
                delete:false
            }
        })

        if(this.props.ProOrAcc ==="Products"){
            this.props.getProducts()
        }
        else{
            this.props.getAccounts()
        }
    }

    deleteIt(url){

        this.setState(()=>{
            return {
                deleteUrl:url,
                delete:true
            }
        })

        
    }

    hideAddProduct =()=>{
        this.setState(()=>{
            return {
                addProduct:false
            }
        })

        


    }
    hideAddAcc =()=>{
        this.setState(()=>{
            return {
                addAcc:false
            }
        })

        


    }

    showAddProduct = (id)=>{

        this.setState(()=>{

            return {

                proData :this.props.products.find((p)=> p.id === id),
                addProduct:true

            }


        })



    }
    showAddAcc = (id)=>{

        this.setState(()=>{

            return {

                accData :this.props.accounts.find((p)=> p.id === id),
                addAcc:true

            }


        })



    }
    




    constructor(props){
        super(props)
        this.deleteIt= this.deleteIt.bind(this)
        if(this.props.ProOrAcc ==="Products"){
            this.props.getProducts()
        }
        else{
            this.props.getAccounts()
        }

        this.state ={

            delete:false,
            deleteUrl:``,
            addProduct : false,
            proData:{},
            addAcc:false,
            accData:{}
        }
       

      


    }

    

    render() {

        
           
           

        
        
        return (
            <div className="pro_compo">

                {this.state.addProduct && <AddProducts 
                    AddProCrossBtn={this.hideAddProduct}
                    getProducts={this.props.getProducts}
                    mode={"edit"}
                    data={this.state.proData}
                     /> 
                     
                      }
                {this.state.addAcc &&  
                <AddAcc 
                 AddAccCrossBtn={this.hideAddAcc}
                 getAccounts={this.props.getAccounts}
                 mode={"edit"}
                 data={this.state.accData}
                 />
                     
                      }



                {this.state.delete && <Delete deleteHide={this.deleteHide} deleteUrl={this.state.deleteUrl} />}

                <div className="pro_con">

                    <table id="accounting_pro_table" >

               {  this.props.ProOrAcc ==="Products" ? (
                        <tr>

                            <th>S.No. </th>
                            <th >Product Name</th>
                            <th>Product HSN No.</th>
                            <th>Edit</th>
                            <th >Delete</th>


                        </tr>)  :
                        (
                        <tr>

                            <th>S.No. </th>
                            <th >Account Name</th>
                            <th>Type</th>
                            <th>GST No.</th>
                            <th>Edit</th>
                            <th>Delete</th>


                        </tr>) 





}
                       

                        {
                                this.props.ProOrAcc ==="Products" ? 
                                this.props.products.map((pro , index)=>{

                                return (
                                <tr>
                                <td>{index+1}</td>
                                <td>{pro && pro.product_name}</td>
                                <td>{pro && pro.hsn_num}</td>

                                <td className="tbtn"
                                onClick={()=>{this.showAddProduct(pro.id)}}
                                ><span >edit</span></td>
                                <td className="tbtn"
                                onClick={()=>{this.deleteIt(`/api/products/${pro.id}`)}}
                                ><span >X</span></td>
                            </tr> )
                                })
                            :
                            this.props.accounts.map((acc , index)=>{

                                return (
                                <tr>
                                <td>{index + 1}</td>
                                <td>{acc && acc.acc_name}</td>
                                <td>{acc && acc.acc_type}</td>
                                <td>{acc && acc.gst_num}</td>
                                <td className="tbtn" onClick={()=>{this.showAddAcc(acc.id)}}
                                >
                                <span>edit</span>
                                </td>
                                <td className="tbtn"
                                onClick={()=>{this.deleteIt(`/api/accounts/${acc.id}`)}}
                                >
                                <span >X</span></td>
                                </tr> 

                                
                                
                                )


                            })
                        }

                    </table>

                </div>
            </div>
        )
    }
}

export default ProCon