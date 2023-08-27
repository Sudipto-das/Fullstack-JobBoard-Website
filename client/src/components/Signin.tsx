import { Button, Card, TextField, Typography } from "@mui/material";
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
  </>
);
};
export default Signin;
