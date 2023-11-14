import { Button, Card, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material";
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
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5em" }}>
        <Card
          variant="outlined"
          sx={{
            width: 500,
            height: 600,
            padding: "1em",
            color: "whitesmoke",
            
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#4CAF50' ,fontWeight:'bold'}}>
            Post A New Job
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            sx={{ marginBottom: 2 }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            minRows={6}
            maxRows={7}
            placeholder="Description"
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: "0.2em",
              color: "black",
              marginBottom: "1em",
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Salary"
            sx={{ marginBottom: 2 }}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Company"
            sx={{ marginBottom: 2 }}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Select
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            sx={{ marginBottom: 2, width: "100%" }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            <MenuItem value="FullStack">FullStack</MenuItem>
            <MenuItem value="BackEnd">BackEnd</MenuItem>
            <MenuItem value="FrontEnd">FrontEnd</MenuItem>
          </Select>
          <Button
            variant="outlined"
            onClick={handlePostJob}
            sx={{
              width: "100%",
              fontFamily: "Courier New",
              fontSize: "1em",
              fontWeight: "bold",
              color: "#43BD78",
            }}
          >
            Post
          </Button>
        </Card>
      </div>
    );
}
export default PostJob;