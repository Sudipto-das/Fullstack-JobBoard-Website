import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { roleState } from "../store/atom/role";
import { userState } from "../store/atom/user";
const Signin = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const role = useRecoilValue(roleState)
  const setUser:any = useSetRecoilState(userState)
  const navigate = useNavigate()
  const handleSignin = async ()=>{
    if(role==='Recruter'){
    await fetch('http://localhost:3001/auth/admin/login',{
      method:'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers:{ "Content-type": "application/json" }
    }).then((response)=>{
      response.json().then((data)=>{
        if (data.token){
          localStorage.setItem('token',data.token)
          setUser(username)
          navigate('/postjob')
        }
        else{
          alert(data.message)
        }
      })
    })
  }
 
if(role === "Candidate"){
  await fetch('http://localhost:3001/auth/user/login',{
    method:'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers:{ "Content-type": "application/json" }
  }).then((response)=>{
    response.json().then((data)=>{
      if (data.token){
        localStorage.setItem('token',data.token)
        setUser(username)
        navigate('/joblist')
        
      }
      else{
        alert(data.message)
      }
    })
  })
}

}
return (
  <>
  <div style={{width:'80%',margin:'0 auto',marginTop:'10em'}}>

  
  <Grid container>
    <Grid item xs={12} sm={5}>
    <div style={{ padding: "1em" ,background:'#ceeec9',borderRadius:'2em',boxShadow:' 12px 12px 10px 1px  #d0d6cf '}}>
            <img
              style={{}}
              src="https://cdni.iconscout.com/illustration/premium/thumb/searching-for-job-online-4487043-3738450.png"
              alt="https://cdni.iconscout.com/illustration/premium/thumb/searching-for-job-online-4487043-3738450.png"
            />
          </div>
    </Grid>
    <Grid item xs={12} sm={5}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5em ",
      }}
    >
      <Typography
        variant="h6"
        style={{
          fontFamily: "Courier New",
          fontSize: "1.2em",
          color: "#43BD78",
          fontWeight: "bold",
        }}
      >
        Wellcome to CareearConnect! SignUp bellow
      </Typography>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2em",
        color: "white",
      }}
    >
      <Card
        variant={"outlined"}
        style={{
          width: 400,
          height: 300,
          padding: "1em",
          
          color: "whitesmoke",
          fontFamily: "Courier New",
        }}
      >
        <TextField
          fullWidth={true}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          
          onChange={(e)=>{
            setUsername(e.target.value)
          }}
        />
        <br />
        <br />
        <TextField
          fullWidth={true}
          id="outlined-basic"
          label="Password"
          
          variant="outlined"
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          style={{
            fontFamily: "Courier New",
            fontSize: "1em",
            fontWeight: "bold",
            color:'#43BD78'
          }}
          onClick={handleSignin}
        >
          Login
        </Button>
        <br />
        <br />
        <span style={{color:"#43BD78"}}>New User?</span>{" "}
        <Link to="/signup" style={{ color: "#43BD78" }}>
          Signup
        </Link>
      </Card>
    </div>
    </Grid>

  </Grid>
  </div>
  </>
);
};
export default Signin;
