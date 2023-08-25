import { Typography, Button, Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atom/user";
import { roleState } from "../store/atom/role";

const Appber = () => {
  const user:any = useRecoilValue(userState);
  const role = useRecoilValue(roleState);
  console.log(user);
  if(user && role == "Recruter"){
    return (
    

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
          marginBottom: "1em",
          zIndex: 1,
          background:'white',
          position: "fixed",
          top: 0,
          width: "100%",
          borderBlockEnd:'0.3px solid black'
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography
            variant={"h6"}
            style={{ fontWeight: "bolder", fontFamily: "initial",color:'#27AE60 ' }}
          >
            CareearConnect
          </Typography>
        </div>
  
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "initial"}}>Applications</Button>
          </div>
  
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "initial"}}>Jobs</Button>
          </div>
  
        </div>
        <div style={{display:'flex' ,marginRight:10,}}>
          <Button style={{marginRight:10,color:'#58D68D'}} variant={'outlined'} onClick={()=>{
            localStorage.setItem("token",null)
            window.location = "/";
          }}>
            Logout
          </Button>
          <Avatar style={{color:"green"}}>{user ? user.charAt(0) : ''}</Avatar>
        </div>
      </div>
    );
  }
  if(user && role == "Candidate"){
    return (
    

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
          marginBottom: "1em",
          zIndex: 1,
          background:'white',
          position: "fixed",
          top: 0,
          width: "100%",
          borderBlockEnd:'0.3px solid black'
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography
            variant={"h6"}
            style={{ fontWeight: "bolder", fontFamily: "initial",color:'#27AE60 ' }}
          >
            CareearConnect
          </Typography>
        </div>
  
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "initial"}}>Applications</Button>
          </div>
  
          <div style={{ marginRight: 10 }}>
            <Button style={{color:'#58D68D',fontFamily: "initial"}}>Jobs</Button>
          </div>
  
        </div>
        <div style={{display:'flex' ,marginRight:10,}}>
          <Button style={{marginRight:10,color:'#58D68D'}} variant={'outlined'} onClick={()=>{
            localStorage.setItem("token",null)
            window.location = "/";
          }}>
            Logout
          </Button>
          <Avatar style={{color:'green'}}>{user?user.charAt(0) : ''}</Avatar>
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
            padding: 5,
            marginBottom: "1em",
            zIndex: 1,
            background:'white',
            position: "fixed",
            top: 0,
            width: "100%",
            borderBlockEnd:'0.3px solid black'
          }}
        >
          <div style={{ marginLeft: 10 }}>
            <Typography
              variant={"h6"}
              style={{ fontWeight: "bolder", fontFamily: "initial",color:'#27AE60 ' }}
            >
              CareearConnect
            </Typography>
          </div>
    
   
          <div style={{display:'flex' ,marginRight:10,}}>
          
            <Avatar>{user}</Avatar>
          </div>
        </div>
      );
    
  
  }


};
export default Appber;
