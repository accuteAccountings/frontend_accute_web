import React,{useState,useEffect} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const permissionsData={read:false,
    write:false}
function UserPermisnEditForm(props) {
    const [user,setUser] = useState("");
    const [permissions,setPermissions] = useState({...permissionsData});

    const handlePermissionsChange = e =>{
        const {checked,name} = e.target;
        
            setPermissions({...permissions,[name]:checked})
        
        
    }

    return (
        <div style={{display:"flex", flexDirection:"column",padding:"5px"}}>
        <form onSubmit={e=>props.handleSavePermissionChanges(e,{id:Math.random(),name:user,permissions:permissions})}>

         <div style={{display:"flex",justifyContent:"space-between"}}>
         <TextField margin="normal"  
            variant="outlined"                    
            style={{marginRight:"5px"}}
            fullWidth
            id="acc_name"
            label="User Name"
            name="name"
            size="small"
            value={user}
            onChange={e=>setUser(e.target.value)}
            required={true}
            />
         <FormControlLabel
           control={
          <Checkbox
            checked={permissions.read}
            onChange={handlePermissionsChange}
            name="read"
            color="primary"
          />
        }
        label="read"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={permissions.write}
            onChange={handlePermissionsChange}
            name="write"
            color="primary"
          />
        }
        label="write"
      />
         </div>
         <div className="buttonGroup"style={{margin:"10px 0", display:"flex", justifyContent:"space-between"}}>
                <Button variant="outlined" type="submit" color="primary">
                 Save Changes
                </Button>
                <Button variant="outlined" type="button"   color="secondary" onClick={()=>props.setOpenEditModal(false)}>Cancel</Button>
            </div>
         </form>
            
        </div>
    )
}

export default UserPermisnEditForm
