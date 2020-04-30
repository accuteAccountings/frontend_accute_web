import React from 'react'

class ProCon extends React.Component {

    getProducts(){


        fetch('/api/products',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        }).then(res => res.json())
        .then(data => {

            
            if(data.Products)
            {this.setState(()=>{
                return {
                    products:data.Products
                }
            })}
        })
        .catch((err)=>{
            alert(err)
        })


    }




    constructor(props){
        super(props)
        this.getProducts= this.getProducts.bind(this)
        this.state ={
            products: [
        ] , 
        }

        this.getProducts()


    }

    render() {

        return (
            <div className="pro_compo">
                <div className="pro_con">

                    <table id="accounting_pro_table">


                        <tr>

                            <th>S.No.</th>
                            <th >Product Name</th>
                            <th>Product HSN No.</th>
                            <th>Edit</th>
                            <th>Delete</th>


                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Milk</td>
                            <td>15684542545</td>
                            <td><a href="">edit</a></td>
                            <td><a href="">X</a></td>
                        </tr> 

                        {this.state.products.map((pro)=>{

                            return (
                            <tr>
                            <td>1</td>
                            <td>{pro && pro.product_name}</td>
                            <td>15684542545</td>
                            <td><a href="">edit</a></td>
                            <td><a href="">X</a></td>
                        </tr> 
                            
                            
                            )


                        })}

                    </table>

                </div>
            </div>
        )
    }
}

export default ProCon