import { Button, Card, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";

const PostJob = ()=>{
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('')
    const [catagory,setCatagory] = useState('')
    const [company,setCompany] = useState('')
    const [salary,setSalary] = useState('')

    const handlePostJob = async () =>{
        await fetch( 'http://localhost:3001/jobs/create',{
            method:'POST',
            body: JSON.stringify({
                    title:title,
                    description:description,
                    salary:salary,
                    company:company,
                    catagory:catagory
                }),
            headers:{
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }

        })
    }
    return <>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5em ",
        }}
      >
        <Typography
          variant="h3"
          style={{
            fontFamily: "Courier New",
            fontSize: "1.2em",
            color: "#43BD78",
            fontWeight: "bold",
          }}
        >
          Post New Job
        </Typography>
      </div>
    
    <div style={{
        display: "flex",
        
        justifyContent: "center",
        marginTop: "2em",
        color: "white",
      }}>
        <Typography>Post your Job</Typography>
        <Card variant={"outlined"}
          style={{
            width: 500,
            height: 600,
            padding: "1em",
            
            color: "whitesmoke",
            fontFamily: "Courier New",
          }}>
            <TextField fullWidth={true}
            id="outlined-basic"
            placeholder="Title"
            variant="outlined"
            onChange={(e)=>{
                setTitle(e.target.value)
            }}/>
            <br/>
            <br />
            <TextareaAutosize
            rowsMin={3}
            maxRows={7}
            placeholder="Description"
            
            style={{ width: "100%" ,border:'1px solid black',borderRadius:'0.2em',color:'black'}}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
             <br/>
             <br />
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Salary"
            onChange={(e)=>{
                setSalary(e.target.value)
            }}
            variant="outlined"/>
             <br/>
            <br />
             
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Company"
            onChange={(e)=>{
                setCompany(e.target.value)
            }}
            variant="outlined"/>
            <br /><br />
            <select style={{color:'black'}} value={catagory} onChange={(e)=>setCatagory(e.target.value)}>
                <option >Select Catagory</option>
                <option >FullStack</option>
                <option >BackEnd</option>
                <option >FrontEnd</option>
            </select>
            <br />
            <br />
              <Button variant="outlined"
            style={{
                width:'100%',
              fontFamily: "Courier New",
              fontSize: "1em",
              fontWeight: "bold",
              color:'#43BD78'
            }} onClick={handlePostJob}> Post</Button>
           
        </Card>
        
      
    </div>
    </>
}
export default PostJob;