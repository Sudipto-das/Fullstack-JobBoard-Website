import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Apply = () => {
 
  let {jobId} = useParams()
 
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
 console.log(coverLetter)
  const handleFile = (e)=>{
     setResume(e.target.files[0])
  }
  const handleSubmit = async ()=>{
    const fromData = new FormData()
    if(resume){
      fromData.append('resume',resume)
      
    }
    fromData.append('coverLetter',coverLetter)
    
    
    try {
      const response = await fetch(`http://localhost:3001/jobs/apply/${jobId}`, {
        method: "POST",
        body: fromData,

        headers: {
          // Use the appropriate content type for FormData
          // Do not set the Content-Type manually for FormData
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error uploading file.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return (
    <div style={{ marginTop: "5em" }}>
      <TextField
        placeholder="Cover Letter"
        onChange={(e) => {
          setCoverLetter(e.target.value);
        }}
      />
      <input
        type="file"
        id="cvFileInput"
        accept=".pdf, .doc, .docx"
        onChange={handleFile}
      ></input>
      <Button
        variant="outlined"
        onClick= {handleSubmit}
      >
        Apply Now
      </Button>
    </div>
  );
};
export default Apply;