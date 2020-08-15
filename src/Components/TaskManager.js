import React from 'react'
import plus from '../img/plus.svg'

export default class TaskManager extends React.Component{

    PostLetter = () => {

        let data = {
            cover_Letter :  document.getElementById('cover_letter').value
        }
         fetch('/api/letters' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => {
            if(data == true){
                this.getLetters()
            }
        })
    }

    getNotes = () => {
        fetch(`/api/letters/cover_notes?id=${this.state.id}`)
       .then((res) => res.json())
       .then((data) => {
           if(data){
               this.setState(() => {
                   return{
                       notes : data
                   }
               })
           }
       })
   }

    getLetters = () => {

        fetch('/api/letters/cover_letter').then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        letters : data
                    }
                })
            }
        })
    }

    constructor(props){
        super(props)

        this.getLetters()

        this.state = {
            letters : [],
            id : null,
            letter : null,
            notes : []
        }

    }
    render(){
        return(
            <div className = "task_man">
               <div className = "whole_box">
                    <div className = "header">
                        <div>Cover Letters</div>
                        {/*<div>
                            <img src = {plus} alt = " " className = "add_cover" />
                
                        </div>*/}
                    </div>
                    <div className = "new_task" >
                        <textarea placeholder = "new_cover_letter..." className = "new_input" id = "cover_letter" />
                        <button onClick = {() => {
                            this.PostLetter()
                            document.getElementById('cover_letter').value = null
                        }}>save</button>
                    </div>
                    {this.state.letters.map((e) => {
                        return(
                            <div className = "tasks" onClick = {async() => {
                               await this.setState(() => {
                                    return{
                                        id : e.id,
                                        letter : e.cover_Letter
                                    }
                                })
                                await this.getNotes()
                            }} >
                                {e.cover_Letter}
                            </div>
                        )
                    })}
               </div>

               <div className = "notes_cont">
                <Cover_Notes
                    id = {this.state.id}
                    letter = {this.state.letter}
                    notes = {this.state.notes}
                    getNotes = {this.getNotes}
                />
            </div>
            </div>
        )
    }
}


class Cover_Notes extends React.Component{

    PostNote = () => {
        let data = {
            cover_note :  document.getElementById('cover_note').value,
            letter_id : this.props.id
        }
         fetch('/api/letters/cover_note' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => {
            if(data == true){
                this.props.getNotes()
            }
        })
    }


    constructor(props){
        super(props)


    }


    render(){
        return(
            <div className = "task_details">
                    <div className = "header">
                        <div>{this.props.letter}</div>
                       {/* <div className  = "img_td">
                            <div>Add new cover note</div>
                            <div>
                                <img src = {plus} alt = " " />
                            </div>
        </div>*/}
                    </div>
                    {this.props.notes.map((e,i) => {
                        return(
                            <div className = "sub_tasks">
                                <div className = "id_st">{i+1}</div>
                                <div className = "text_st">{e.cover_note}</div>
                                <div className = "date_st">{e.createdAt.slice(0,10)}</div>
                            </div>
                        )
                    })}
                    <div className = "add_sub_tasks">
                        <textarea placeholder = "new_cover_letter..." className = "new_input" id = "cover_note" />
                        <button onClick = {() => {
                            this.PostNote()
                            document.getElementById('cover_note').value = null
                        }}>save</button>
                    </div>
               </div>
        )
    }
}