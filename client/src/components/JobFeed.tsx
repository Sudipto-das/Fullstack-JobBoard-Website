import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { jobState } from "../store/atom/job";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const JobFeed = () => {
  const [jobs,setJobs] = useRecoilState(jobState);
  
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const fetchJob = async () => {
    try {
      const response = await fetch("http://localhost:3001/jobs/alljobs", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setJobs(data.jobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} style={{ background: "#D5F5E3", padding: "1em" }}>
            <JobsList
              onSelectJob={(jobId) => setSelectedJobId(jobId)}
              currentPage={currentPage}
              jobsPerPage={jobsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(jobs.length / jobsPerPage)}
              onPageChange={handlePageChange}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <JobDetails selectedJobId={selectedJobId} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const JobsList = ({ onSelectJob, currentPage, jobsPerPage }) => {
  const jobs = useRecoilValue(jobState);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
      {currentJobs.map((job) => (
        <div key={job.id} style={{ marginBottom: "1em" }}>
          <List
            style={{ cursor: "pointer" }}
            onClick={() => onSelectJob(job._id)}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {job.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {job.company}
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

const JobDetails = ({ selectedJobId }) => {
  const navigate = useNavigate();
  const jobs = useRecoilValue(jobState);
  

  if (!selectedJobId && jobs.length>0){
    selectedJobId = jobs[0]._id
  }
  const selectedJob = jobs.find((job) => job._id === selectedJobId);
  return (
    <div style={{ padding: "1em" }}>
      {selectedJob && (
        <>
          <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "0.5em" }}>
            {selectedJob.title}
          </Typography>
          <Typography variant="subtitle1" style={{ color: "green", marginBottom: "1em" }}>
            Company: {selectedJob.company}
          </Typography>
          <Typography variant="body1" paragraph>
            {selectedJob.description}
          </Typography>
          
          <Typography variant="subtitle1" style={{ color: "green" }}>
            Pay: ${selectedJob.salary}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1em" }}
            onClick={() => {
              navigate('/apply/' + selectedJobId);
            }}
          >
            Apply
          </Button>
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div style={{ marginTop: "1em" }}>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "contained" : "outlined"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default JobFeed;
