import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
const Signin = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const handleSignin = async ()=>{
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
            background: "#7777A4",
            color: "whitesmoke",
            fontFamily: "Courier New",
          }}
        >
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            color="secondary"
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
            color="secondary"
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
          <Link to="/signup" style={{ color: "ActiveBorder" }}>
            Signup
          </Link>
        </Card>
      </div>
    </>
  );
};
export default Signin;
