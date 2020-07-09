import React from 'react'
import axios from 'axios'
import {saveAs} from 'file-saver'

export default class Printed_ledger extends React.Component{
    state = {
        name : '',
        receiptId : 0,
        price1 : 0,
        price2 : 0
    }

    handleChange = ({target : {value , name}}) => this.setState({ [name] : value})

    downloadPdf = () => {
        axios.post('/create-pdf' , this.state)
        .then(() => axios.get('/fetch-pdf') , {responseType : 'blob'})
        .then((res) => {
                const pdfBlob = new Blob([res.data] , {type : 'application/pdf'})

                saveAs(pdfBlob , 'newpdf.pdf')
        })

    
    }

    render(){
        return (
            <div>
                <input type = "text" placeholder = "name" name = "name" onChange = {this.handleChange} />
                <input type = "number" placeholder = "receipt Id" name = "receiptId" onChange = {this.handleChange}  />
                <input type = "number" placeholder = "Price 1" name = "price1"  onChange = {this.handleChange} />
                <input type = "number" placeholder = "Price 2" name = "price2" onChange = {this.handleChange}  />
                <button onClick ={this.downloadPdf}>Download</button>
            </div>
        )
    }
}