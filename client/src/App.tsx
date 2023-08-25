import "./App.css";
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from "./components/Signin";
import LandingPage from "./components/LandingPage";
import JobFeed from './components/JobFeed';
import PostJob from "./components/PostJob";
import Appber from "./components/Appber";
import Apply from "./components/Apply";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { roleState } from "./store/atom/role";
import { userState } from "./store/atom/user";
function App() {
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
      </Routes>
    </Router>
  )
}

const InitUser =()=>{
  const setUser = useSetRecoilState(userState)
  const role = useRecoilValue(roleState)
  
  const Init = async ()=>{
    try{
      if (role == 'Recruter'){
        
         fetch(`http://localhost:3001/auth/admin/me`,{
          method:'GET',
          headers:{
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        }).then((res)=>{
          res.json().then((data)=>{
            if(data){
              setUser(data.username)
              console.log(data.username)
            } else{
              setUser(null)
            }
            
          })
        })
      } if(role =='Candidate'){
        fetch(`http://localhost:3001/auth/user/me`,{
          method:'GET',
          headers:{
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        }).then((res)=>{
          res.json().then((data)=>{
            if(data){
              setUser(data.username)
              console.log(data)
            } else{
              setUser(null)
            }
            
          })
        })
      }
    } catch(e){
      setUser(null)
    }
  }
  useEffect(() => {
    Init()
    
  }, []);
  return <></>
}

export default App;


