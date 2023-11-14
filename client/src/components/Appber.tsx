import { Typography, Button, Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atom/user";
import { roleState } from "../store/atom/role";
import { useNavigate } from "react-router-dom";

const Appber = () => {
  const role = useRecoilValue(roleState)
  const user:any = useRecoilValue(userState);
  const username = user ? user.username : '';
  const navigate = useNavigate()
  console.log(user);
  if(user && user.isAdmin || user && role =="Recruter"){
    return (
    
      
      <div
      
        style={{
          display: "flex",
            justifyContent: "space-between",
            padding: '1em',
            marginBottom: "1em",
            zIndex: 1,
            background:'white',
            boxShadow:'10px 5px 5px gray',
            top: 0,
            width: "80%",
            margin:'0.5em auto',
            borderBlockEnd:'0.3px solid black',
           borderRadius:'.5em',
           backgroundColor:' #def0db '
         
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography
            variant={"h6"}
            style={{ fontWeight: "bolder", fontFamily: "monospace",color:'#27AE60 ' }}
          >
            CareearConnect
          </Typography>
        </div>
  
        <div style={{ display: "flex" }}>
       
  
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "monospace",fontWeight:'bold'}} onClick={()=>{navigate('/dashboard')}}>Dashboard</Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "monospace",fontWeight:'bold'}} onClick={()=>{navigate('/postjob')}}>Create</Button>
          </div>
  
        </div>
        <div style={{display:'flex' ,marginRight:10,}}>
          <Button style={{marginRight:10,color:'#58D68D'}} variant={'outlined'} onClick={()=>{
            localStorage.setItem("token",null)
            window.location = "/";
          }}>
            Logout
          </Button>
          <Avatar style={{ color: 'white',background:'#348055' }}>{typeof username === 'string' ? username.charAt(0) : '' || user.charAt(0)}</Avatar>

        </div>
      </div>
    );
  }
  if(user && user.isUser || user && role=="Candidate" ){
    return (
    

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: '1em',
          marginBottom: "1em",
          zIndex: 1,
          background:'white',
          boxShadow:'10px 5px 5px gray',
          top: 0,
          width: "80%",
          margin:'0.5em auto',
          borderBlockEnd:'0.3px solid black',
         borderRadius:'.5em',
         backgroundColor:' #def0db '
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography
            variant={"h6"}
            style={{ fontWeight: "bolder", fontFamily: "monospace",color:'#27AE60 ' }}
          >
            CareearConnect
          </Typography>
        </div>
  
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "monospace" ,fontWeight:'bold'}} onClick={()=>{navigate('/applied')}}>Applications</Button>
          </div>
  
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "monospace" ,fontWeight:'bold'}} onClick={()=>{navigate('/joblist')}}>Jobs</Button>
          </div>
  
        </div>
        <div style={{display:'flex' ,marginRight:10,}}>
          <Button style={{marginRight:10,color:'#58D68D'}} variant={'outlined'} onClick={()=>{
            localStorage.setItem("token",null)
            window.location = "/";
          }}>
            Logout
          </Button>
          <Avatar style={{ color: 'white' ,background:'#348055'}}>{typeof username === 'string' ? username.charAt(0) : '' || user.charAt(0)}</Avatar>

        </div>
      </div>
    );
  }
  else{
    
      return (
      
  
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: '1em',
            marginBottom: "1em",
            zIndex: 1,
            background:'white',
            boxShadow:'10px 5px 5px gray',
            top: 0,
            width: "80%",
            margin:'0.5em auto',
            borderBlockEnd:'0.3px solid black',
           borderRadius:'.5em',
           backgroundColor:' #def0db '
          }}
        >
          <div style={{ marginLeft: 10 }}>
            <Typography
              variant={"h6"}
              style={{ fontWeight: "bolder", fontFamily: 'monospace',color:'#27AE60 ' }}
            >
              CareearConnect
            </Typography>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "monospace",fontWeight:'bold'}} onClick={()=>{navigate('/')}}>HomePage</Button>
          </div>
   
          <div style={{display:'flex' ,marginRight:10,}}>
          
            <Avatar>{user}</Avatar>
          </div>
        </div>
      );
    
  
  }


};
export default Appber;
