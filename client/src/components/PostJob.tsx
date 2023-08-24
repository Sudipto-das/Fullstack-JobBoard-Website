import { Button, Card, TextField, Typography } from "@mui/material";
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
    return <div>
        <Typography>Post your Job</Typography>
        <Card>
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e)=>{
                setTitle(e.target.value)
            }}/>
            <br/>
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Description"
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
            variant="outlined"/>
             <br/>
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Salary"
            onChange={(e)=>{
                setSalary(e.target.value)
            }}
            variant="outlined"/>
             <br/>
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Catagory"
            onChange={(e)=>{
                setCatagory(e.target.value)
            }}
            variant="outlined"/>
             <br/>
            <TextField fullWidth={true}
            id="outlined-basic"
            label="Company"
            onChange={(e)=>{
                setCompany(e.target.value)
            }}
            variant="outlined"/>
        </Card>
        <Button variant='outlined' onClick={handlePostJob}> Post</Button>
    </div>
}
export default PostJob;