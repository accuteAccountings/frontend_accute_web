import React from 'react'

class ProCon extends React.Component {




    constructor(props){
        super(props)
        if(this.props.ProOrAcc ==="Products"){
            this.props.getProducts()
        }
        else{
            this.props.getAccounts()
        }
       

      


    }

    

    render() {

        
           
           

        
        
        return (
            <div className="pro_compo">
                <div className="pro_con">

                    <table id="accounting_pro_table" >

                    
                        <tr>

                            <th>S.No. </th>
                            <th >Product Name</th>
                            <th>Product HSN No.</th>
                            <th>Edit</th>
                            <th>Delete</th>


                        </tr>

                       

                        {
                                this.props.ProOrAcc ==="Products" ? 
                                this.props.products.map((pro , index)=>{

                                return (
                                <tr>
                                <td>{index+1}</td>
                                <td>{pro && pro.product_name}</td>
                                <td>{pro && pro.hsn_num}</td>
                                <td><a href="">edit</a></td>
                                <td><a href="">X</a></td>
                            </tr> )
                                })
                            :
                            this.props.accounts.map((acc , index)=>{

                                return (
                                <tr>
                                <td>{index + 1}</td>
                                <td>{acc && acc.name}</td>
                                <td>15684542545</td>
                                <td><a href="">edit</a></td>
                                <td><a href="">X</a></td>
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