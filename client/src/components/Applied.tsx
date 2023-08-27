import React, { useEffect, useState } from "react";
import axios from "axios";
import { JobsList } from "./JobFeed";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
const Applied = () => {
  const [applications, setApplications] = useState([]);

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
          setApplications(data.appliedJob);
          console.log(data);
        });
      });
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div style={{marginTop:'6em'}}>
        <Typography variant="h4"> My Applications</Typography>
      {applications.map((job: any) => (
        <div key={job.id} style={{ padding: "1em" }}>
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
                    {job.title}
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
                    {job.company}
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
                    {job.salary}
                  </Typography>
                  </>
                  
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      ))}
    </div>
  );
};

export default Applied;
