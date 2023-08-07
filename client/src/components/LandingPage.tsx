import { Button } from "@mui/material";
import { roleState } from "../store/atom/role";
import {  useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const navigate = useNavigate()
  const  setRole = useSetRecoilState(roleState);
  return (
    <div>
      <Button
        onClick={() => {
          setRole("Recruter");
          navigate('/signup')
        }}
      >
        Want to Post Job
      </Button>
      <Button
        onClick={() => {
          setRole("Candidate");
          navigate('/signup')
        }}
      >
        Want to find Job
      </Button>
    </div>
  );
};
export default LandingPage;
