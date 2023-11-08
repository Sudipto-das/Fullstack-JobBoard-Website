import React, { useEffect, useState } from "react";
import axios from "axios";
import { JobsList } from "./JobFeed";
import { Button, CircularProgress, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
const Applied = () => {
  const [applications, setApplications] = useState([]);
  const [loading,setLoading] = useState(true)

  const fetchAppliedJobs = async () => {
    try {
      fetch("http://localhost:3001/jobs/applied", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        res.json().then((data) => {
          setApplications(data.appliedJobs);
          setLoading(false)
          
        });
      });
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };
  console.log(applications)
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    
      <div style={{width:'80%',margin:'6em auto', }}>
        <Typography variant="h4" style={{fontFamily:'initial',color:' #abe8a0 '}}> My Applications</Typography>
        {loading? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div>
        ):(
          applications.map((job: any) => (
            <div key={job.job[0]._id} style={{ padding: "1em" }}>
              <List
                style={{ cursor: "pointer" }}
                sx={{ width: "100%", maxWidth: 360 }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography
                        style={{
                          fontFamily: "initial",
                          fontWeight: "bolder",
                          fontSize: "1.2em",
                        }}
                      >
                        {job.job[0].title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          style={{ fontFamily: "initial" }}
                        >
                          {job.job[0].company}
                        </Typography>
                        <br />
                        Pay: $
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          style={{ fontFamily: "initial" }}
                        >
                          {job.job[0].salary}
                        </Typography>
                        <br />
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          style={{ fontFamily: "initial" }}
                        >
                          {job.status}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Button variant='outlined'>View</Button>
                <br />
                <Divider variant="inset" component="li" />
              </List>
            </div>
          ))
        )}
        
      </div>
    );
    
  
};

export default Applied;
