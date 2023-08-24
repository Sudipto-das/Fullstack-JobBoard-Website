import { Button,  Typography,  } from "@mui/material";
import { roleState } from "../store/atom/role";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const setRole = useSetRecoilState(roleState);
  return (
    <>
    <div
      style={{ maxWidth: "1350px", margin: "0 auto", justifyContent: "center" ,minHeight:'75vh'}}
    >
      <Typography
        variant="h4"
        style={{
          marginTop: "3em",
          color: "Highlight",
          fontFamily: "Courier New, Courier, monospace",
          fontWeight: "bolder",
        }}
      >
        Welcome to CareerConnect
      </Typography>
      <Typography
        variant="h6"
        style={{ fontFamily: "Courier New, Courier, monospace" }}
      >
        {" "}
        Introducing "CareerConnect," your gateway to a world of professional
        opportunities. Our job portal website is designed to effortlessly
        connect ambitious job seekers with their dream careers and
        forward-thinking employers with exceptional talent. <br />
        For employers, posting job openings on CareerConnect is a breeze. Gain
        access to a vast pool of qualified candidates, review resumes, and
        engage with potential hires through seamless communication tools. Our
        intuitive dashboard empowers you to manage your recruitment process
        efficiently and effectively
      </Typography>
      {" "}
      <div style={{display:'flex',justifyContent:'center',marginTop:'2em',gap:'1em'}}>
      <Button
      style={{fontWeight:'bolder',background:'black'}}
        onClick={() => {
          setRole("Recruter");
          navigate("/signup");
        }}
      >
        Join As Employer
      </Button>
      <Button 
      style={{background:'black',fontWeight:'bolder'}}
        onClick={() => {
          setRole("Candidate");
          navigate("/signup");
        }}
      >
        Join As Employee
      </Button>
      </div>
    </div>
    <div style={{background:'gray' ,display:'flex',justifyContent:'center',marginTop:'1em',padding:'.8em'}}>
       <Typography>
            &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
          </Typography>
    </div>
    </>
  );
};
export default LandingPage;
