import "./App.css";
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from "./components/Signin";
import LandingPage from "./components/LandingPage";
import JobFeed from './components/JobFeed';
import PostJob from "./components/PostJob";
import Appber from "./components/Appber";
import Apply from "./components/Apply";
import React, {  useEffect } from "react";
import {   useSetRecoilState } from "recoil";
import API_URL from "./config";
import { userState } from "./store/atom/user";
import Applied from "./components/Applied";
import Dashboard from "./components/Dashboar";

interface UserData {
  isAdmin: boolean;
  charAt(arg0: number): import("react").ReactNode;
  isUser: boolean;
  username:string
}

const App:React.FC=()=> {
  return (
    <Router>
      <Appber/>
      <InitUser/>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/joblist" element={<JobFeed/>}></Route>
      <Route path="/postjob" element={<PostJob/>}></Route>
      <Route path="/apply/:jobId" element={<Apply/>}></Route>
      <Route path="/applied" element={<Applied/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  )
}

const InitUser : React.FC=()=>{
 
  const setUser =  useSetRecoilState<UserData | null>(userState);


  
  const Init = async ()=>{
    try{
      
        
         fetch(`${API_URL}/auth/me`,{
          method:'GET',
          headers:{
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        }).then((res)=>{
          res.json().then((data)=>{
            if(data){
              setUser(data.username)
              
            } else{
              setUser(null)
            }
            
          })
        })
       } catch(e){
      setUser(null)
    }
  }
  useEffect(() => {
    Init()
    
  }, []);
  return null
}

export default App;


