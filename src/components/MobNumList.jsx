import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export default function MobNumList({mobNumList,addMobNum,removeMobNum,handleChange}) {
    const mobNum = useState([...mobNumList])
    console.log(mobNum);
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
         {mobNum.map((num,index)=>(
             <div key={num.id} style={{display:"flex"}}>
                     <TextField margin="normal"  
                       variant="outlined"                    
                       style={{marginRight:"5px"}}
                       id="mob_num"
                       label="Mobile Number"
                       name="mob_num"
                       size="small"
                       value={num.number}
                       onChange={handleChange(num)}
                       />
                       <div style={{width:"20%",marginTop:"18px"}} >
                       {index===0?(<Button variant="outlined" color="primary" style={{textTransform:"none"}} onClick={()=>addMobNum(num)}>+</Button>):(<Button variant="outlined" color="secondary" style={{textTransform:"none"}} onClick={()=>removeMobNum(num)}>-</Button>) }
                       </div>
             </div>
         ))}   
        </div>
    )
}

