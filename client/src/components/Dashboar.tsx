import { Box, List, ListItem, Button, Divider, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading,setLoading] = useState(true)
  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:3001/jobs/applications", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setApplications(response.data.applications);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAccept = (applicationId) => {
    // Handle the "Accept" action for the application with the given ID
    // You can implement your logic here
  };

  const handleReject = (applicationId) => {
    // Handle the "Reject" action for the application with the given ID
    // You can implement your logic here
  };

  const handleDownloadCV = (applicationId: any) => {
    // Handle the "Download CV" action for the application with the given CV URL
    // You can implement your logic here, e.g., open a new tab with the CV file
    axios.get(`http://localhost:3001/jobs//download/resume/${applicationId}`, { responseType: 'blob' }).then((response) => {
      // Create a URL object for the resume file
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));

      // Create an anchor tag and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf'; // Set the filename for the download
      a.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    })
  };

  return (
    <div style={{ marginTop: '5em' }}>
      <Grid container>
        <Grid item lg={6} md={12} sm={12}>
          <Box mt={4} mx="auto" maxWidth={800}>
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'monospace' ,fontWeight:'bold'}}>
              Job Applications
            </Typography>
            <List>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
                </div>
              ) : (
                applications === undefined   ? (
                  <Typography variant="body1" style={{ textAlign: 'center' ,fontWeight:'bolder'}}>
                    No applications found.
                  </Typography>
                ) : (
                  applications.map((application: any) => (
                    <Paper key={application.id} elevation={3} style={{ marginBottom: "16px" }}>
                      <ListItem>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography variant="h6">Application ID: {application.id}</Typography>
                          </Grid>
                          <Grid item xs={6} container justifyContent="flex-end">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleAccept(application.id)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleReject(application.id)}
                            >
                              Reject
                            </Button>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleDownloadCV(application.id)}
                            >
                              Download CV
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Paper>
                  ))
                )
              )}
            </List>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
