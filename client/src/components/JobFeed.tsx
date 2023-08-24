import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { jobState } from "../store/job";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


const JobFeed = () => {
  
  const setJobs = useSetRecoilState(jobState);
  const [selectedJobId, setSelectedJobId] = useState();
  const [loading, setLoding] = useState(true);
  const fetchJob = async () => {
    await fetch("http://localhost:3001/jobs/alljobs", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        setLoding(false);
        setJobs(data.jobs);
      });
    });
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <div>
      {loading ? (
        <p> Loading....</p>
      ) : (
        <Grid container style={{marginTop:'3em'}}>
          <Grid
            item
            lg={4}
            md={12}
            sm={12}
            style={{background:"#D5F5E3"}}
          >
            <JobsList onSelectJob={(jobId: any) => setSelectedJobId(jobId)} />
          </Grid>
          <Grid item lg={8} md={12} sm={12}>
            <JobDetails selectedJobId={selectedJobId} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export const JobsList = ({ onSelectJob }) => {
  const jobs = useRecoilValue(jobState);

  return (
    <div>
      {jobs.map((job: any) => (
        <div key={job.id} style={{ padding: "1em" }}>
          <List
            style={{ cursor: "pointer" }}
            onClick={() => onSelectJob(job._id)}
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
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    style={{ fontFamily: "initial" }}
                  >
                    {job.description}
                  </Typography>
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

export const JobDetails = ({ selectedJobId }) => {
  const navigate = useNavigate()
  const jobs = useRecoilValue(jobState);
  console.log(jobs);
  const selectedJob: any = jobs.find((job: any) => job._id === selectedJobId);
  return (
    <div
      style={{
        position: "fixed",
        padding: "1em",
        
        width: "100vw",
        height:'100vh'
      }}
    >
      {selectedJob && (
        <>
          <Typography variant="h3" style={{ fontFamily: "initial" }}>
            {selectedJob.title}
          </Typography>
          <p style={{ fontFamily: "initial" }}>{selectedJob.description}</p><br></br>

          <Button variant="contained" onClick={()=>{
            navigate('/apply/' + selectedJobId)
          }}>Apply</Button>
        </>
      )}
    </div>
  );
};
export default JobFeed;
