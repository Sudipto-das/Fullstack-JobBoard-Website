import React, { useEffect } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { roleState } from "../store/atom/role";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atom/user";

const LandingPage = () => {
  const navigate = useNavigate();
  const setRole = useSetRecoilState(roleState);
  
  

  return (
    <>
      <Grid
        container
        style={{ maxWidth: "1350px", margin: "0 auto", minHeight: "75vh" }}
      >
        <Grid item xs={12} sm={5}>
          <div style={{ padding: "2em" }}>
            <img
              style={{}}
              src="https://cdni.iconscout.com/illustration/premium/thumb/searching-for-job-online-4487043-3738450.png"
              alt="https://cdni.iconscout.com/illustration/premium/thumb/searching-for-job-online-4487043-3738450.png"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={7}>
          <div style={{ padding: "2em" }}>
            <Typography
              variant="h3"
              style={{
                marginTop: "3em",
                color: "#27AE60",
                fontFamily: "Courier New, Courier, monospace",
                fontWeight: "bolder",
              }}
            >
              Welcome To CareerConnect
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Courier New, Courier, monospace",
                fontSize: "1em",
              }}
            >
              Introducing "CareerConnect," your gateway to a world of
              professional opportunities. Our job portal website is designed to
              effortlessly connect ambitious job seekers with their dream
              careers and forward-thinking employers with exceptional talent.
              For employers, posting job openings on CareerConnect is a breeze.
              Gain access to a vast pool of qualified candidates, review
              resumes, and engage with potential hires through seamless
              communication tools. Our intuitive dashboard empowers you to
              manage your recruitment process efficiently and effectively
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "2em",
            }}
          >
            <Button
              style={{
                border: "0.2px solid green",
                color: "black",
                fontFamily: "initial",
                marginRight: "1em",
              }}
              onClick={() => {
                setRole("Recruter");
                navigate("/signup");
              }}
            >
              Join As Employer
            </Button>
            <Button
              style={{
                border: "0.2px solid green",
                color: "black",
                fontFamily: "initial",
              }}
              onClick={() => {
                setRole("Candidate");
                navigate("/signup");
              }}
            >
              Join As Employee
            </Button>
          </div>
        </Grid>
      </Grid>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
          padding: ".8em",
          color: "green",
          
        }}
      >
        <Typography style={{fontFamily: "initial",}}>
          &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
        </Typography>
      </div>
    </>
  );
};

export default LandingPage;
