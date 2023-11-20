import  { useEffect, useState } from "react";


import { Button, CircularProgress,  List, ListItem, ListItemText, Typography } from "@mui/material";

const Applied = () => {
  
  const [applications, setApplications] = useState([]);
  const [loading,setLoading] = useState(true)
  const [currentPage,setCurrentPage] = useState(1)
  const [applicationsPerPage] = useState(3)
  const fetchAppliedJobs = async () => {
    try {
      fetch(`https://careerconnect-zs06.onrender.com/jobs/applied`, {
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
  }, [currentPage]);

  const handlePageChange = (newPage)=>{
    setCurrentPage(newPage)
  }
  const indexOfLastAppliction= currentPage * applicationsPerPage;
 const indexOfFirstApplication = indexOfLastAppliction - applicationsPerPage;
 const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastAppliction);

 return (
  <div style={{ width: "80%", margin: "6em auto", textAlign: "center" }}>
    <Typography variant="h4" style={{ fontWeight: "bold", color: "#4CAF50", marginBottom: "1em" }}>
      My Applications
    </Typography>

    {loading ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </div>
    ) : (
      currentApplications.map((job:any) => (
        <div key={job.job[0]._id} style={{ padding: "1em", marginBottom: "1em", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <List sx={{ width: "100%", maxWidth: 360, backgroundColor: "white", borderRadius: "8px" }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bolder",
                      fontSize: "1.2em",
                      color: "#333",
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
                      style={{ fontFamily: "Arial, sans-serif", color: "#555" }}
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
                      style={{ fontFamily: "Arial, sans-serif", color: "#555" }}
                    >
                      {job.job[0].salary}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      style={{ fontFamily: "Arial, sans-serif", color: "#555" }}
                    >
                      {job.status}
                    </Typography>
                  </>
                }
              />
             <Button variant="outlined" style={{  color: "#4CAF50" ,justifyContent:'center'}}>  View </Button>
            </ListItem>
            
          </List>
          
        </div>
      ))
    )}

    <Pagination currentPage={currentPage} totalPages={Math.ceil(applications.length / applicationsPerPage)} onPageChange={handlePageChange} />
  </div>
);
    
  
};

const Pagination = ({currentPage,totalPages,onPageChange}) =>{
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return  (    <div style={{ marginTop: '1em' }}>
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
    )

}

export default Applied;
