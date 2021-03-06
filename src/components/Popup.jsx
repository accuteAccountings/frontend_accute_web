import React from 'react'
import {Dialog,DialogTitle,DialogContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import cancelIcon from '../assets/icons/cancel.svg';
function Popup(props) {
    const {type, title, children,openPopup, setOpenEditModal}= props
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
            <div style={{display:"flex", justifyContent:"space-between"}}>
             <div>
              {title}
             </div>
             <div>
             {type==="basic"?(
                  <Button size="small" color="secondary" onClick={()=>setOpenEditModal(type,false)}>
                  <img src={cancelIcon} alt="close" style={{width:"15px", height:"15px"}}/>
                 </Button>
             ):(
                <Button size="small" color="secondary" onClick={()=>setOpenEditModal(type,false)}>
                <img src={cancelIcon} alt="close" style={{width:"15px", height:"15px"}}/>
               </Button>
             )}

             </div>   
             </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup
