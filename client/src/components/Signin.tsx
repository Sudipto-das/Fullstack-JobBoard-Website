import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roleState } from "../store/atom/role";
const Signin = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const role = useRecoilValue(roleState)
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
            color: "Highlight",
            fontWeight: "bold",
          }}
        >
          Wellcome to JobErina! Signin bellow
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
            background: "#D6DBDF",
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
            variant="contained"
            style={{
              fontFamily: "Courier New",
              fontSize: "1em",
              fontWeight: "bold",
              background:'Highlight'
            }}
            onClick={handleSignin}
          >
            Login
          </Button>
          <br />
          <br />
          New here?{" "}
          <Link to="/signup" style={{ color: "CaptionText" }}>
            Signup
          </Link>
        </Card>
      </div>
    </>
  );
};
export default Signin;
