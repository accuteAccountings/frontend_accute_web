import React from 'react'
import cross from './../img/cancel.svg'

class AddProducts extends React.Component {


    render() {

        return (

            <div className="add_products">

                <div className="overlay"></div>

                <div className="add_pro_con">

                    <div className="add_pro_head">
                        <h1>Add Products</h1>
                        <img onClick={this.props.AddProCrossBtn} src={cross} alt="" />
                    </div>

                    <div className="add_pro_body">

                        <div className="add_pro_name">

                            <span>Product Name</span>
                            <input className="add_pro_inp_name" type="text" placeholder="Enter Product Name" />

                        </div>
                        <div className="add_pro_num">

                            <span>HSN No.</span>

                            <input className="add_pro_inp_num" placeholder="Enter HSN No." type="text" />


                        </div>

                        <div className="two_items" id="add_pro_btns">
                            <button className="add_pro_can_btn" onClick={this.props.AddProCrossBtn}>Cancel</button>
                            <button className="add_pro_btn" onClick={this.props.AddProSaveBtn}>Save</button>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}

export default AddProducts