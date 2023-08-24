import "./App.css";
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from "./components/Signin";
import LandingPage from "./components/LandingPage";
import JobFeed from './components/JobFeed';
import PostJob from "./components/PostJob";
import Appber from "./components/Appber";
import Apply from "./components/Apply";
function App() {
  return (
    <Router>
      <Appber/>
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

export default App;
