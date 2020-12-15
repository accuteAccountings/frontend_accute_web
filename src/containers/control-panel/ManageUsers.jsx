import React,{useState} from 'react'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Pencil from "../../assets/icons/pencil.svg";
import Trash from "../../assets/icons/trash.svg";
import Popup from "../../components/Popup";
import UserPermisnEditForm from "./UserPermisnEditForm";
import UserPermisnAddForm from './UserPermisnAddForm';
const useStyles = makeStyles({
    main_container:{
        fontFamily:"Arial, Helvetica, sans-serif",
        padding:"10px",
    },
    invoice_header:{
        display: "flex",
        justifyContent:"space-between",
        padding:"10px",
    },
    header:{
        fontWeight:"bolder",
    },
    button:{
        padding:"3px 10px",
        margin:"6px 20px",
        borderRadius:"20px",
        border: "1px solid #344f6b",
        fontSize:"1rem",
        height:"25px",
        cursor:"pointer"

    },
    invoice_container:{
        padding:"10px",
        width:"20%",
        fontSize: "1.1rem",
    },
    invoice_props:{
        fontSize:"1.2rem",
        fontWeight:600,
        color:"#383935"
    },
    pencil:{
        height:"20px",
        margin:"10px",
        cursor:"pointer",
    },
    trash:{
        height:"20px",
        margin:"10px",
        cursor:"pointer",
    }
    
  });
const usersData= [{
    id:1,
    name:"john Doe",
    permissions:{
        read:true,
        write:true,
    }
}]
function ManageUsers() {
    const classes = useStyles();
    const [users, setUsers] = useState([...usersData])
  
    const [openUserEditModal,setOpenUserEditModal] = useState(false);
    const [openUserAddModal, setOpenUserAddModal]= useState(false);
    const saveProfileOnUpdate=(e,user)=>{
        e.preventDefault();
    
        setUsers( users.map(ele=>{
           if(ele.id===user.id){
               return {...ele, ...user}
           }
           return ele;
       }))
       setOpenUserEditModal(false);
    }
    const saveProfile = (e, user)=>{
        e.preventDefault();
        
        setUsers([...users,user])
        setOpenUserAddModal(false);
    }
    const removeProfile= (user) => {
        setUsers([...users.filter(ele=>{
            return user.id!== ele.id
        })])
    }
    return (
        <div className={classes.main_container}>
            
            <div className={classes.invoice_header}>
             <div className={classes.header}>
              Manage Users
             </div>
             <div className={classes.button} onClick={()=>setOpenUserAddModal(true)}>
                 + Add User
             </div>
             <Popup  openPopup={openUserAddModal} title="Add User Permissions" setOpenEditModal={setOpenUserAddModal}>
                  <UserPermisnAddForm setOpenEditModal={setOpenUserAddModal} handleSavePermissionChanges={saveProfile}/>
                </Popup>
            </div>
            {users.map(user=>(
            <div  key={user.id} style={{marginBottom:"10px"}}>
            <Paper>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div className={classes.invoice_container}>
                 
                  <div >
                    <div><span className={classes.invoice_props}>User : </span>    {user.name}</div>
                  
                    <div><span className={classes.invoice_props}>Read : </span>    {user.permissions.read?"Yes":"No"}</div>
                 
                    <div><span className={classes.invoice_props}>Write : </span>    {user.permissions.write?"Yes":"No"}</div>
                 <br/>
                  </div>
                 
                </div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                   <div onClick={()=>{setOpenUserEditModal(true)}}>
                       <img  className={classes.pencil} src={Pencil} />
                   </div>
                   <Popup  openPopup={openUserEditModal} title="Edit User Permissions"    setOpenEditModal={setOpenUserEditModal}>
                     <UserPermisnEditForm setOpenEditModal={setOpenUserEditModal}    handleSavePermissionChanges={saveProfileOnUpdate} user={user}/>
                   </Popup>
                   <div onClick={()=>{removeProfile(user)}}>
                       <img  className={classes.trash} src={Trash} />
                   </div>
                </div>
            </div>
            </Paper></div>))}
            
        </div>
    )
}

export default ManageUsers
