import { Button, Card,  TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MuiFileInput } from 'mui-file-input'
import API_URL from "../config";

const Apply = () => {
  
  const { jobId }= useParams();

  const [resume, setResume] = useState<File|null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");

  const handleFile = (value:File|null) => {
    setResume(value)
  }
  const handleSubmit = async () => {
    const fromData = new FormData()
    if (resume) {
      fromData.append('resume', resume)

    }
    fromData.append('coverLetter', coverLetter)


    try {
      const response = await fetch(`${API_URL}/jobs/apply/${jobId}`, {
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
        
        alert(data.message)
      } else {
        console.error("Error uploading file.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5em",
        color: "white",
      }}
    >
      <Card
        variant={"outlined"}
        style={{
          width: 500,
          height: 500,
          padding: "1em",
          color: "whitesmoke",
          fontFamily: "Courier New",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Center the items vertically
        }}
      >
        <TextareaAutosize
          style={{ width: "100%" ,color:'black'}} // Make the textarea full width
          minRows={10}
          placeholder="Cover Letter"
          onChange={(e) => {
            setCoverLetter(e.target.value);
          }}
        />
        <MuiFileInput
          name="resume"
          placeholder="insert a file"
          id="cvFileInput"
          value={resume}
          onChange={handleFile}
        />
        <Button
          variant="outlined"
          onClick={handleSubmit}
          style={{ alignSelf: "center" }} // Center the button horizontally
        >
          Apply Now
        </Button>
      </Card>
    </div>
  );
};
export default Apply;