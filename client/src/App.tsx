import "./App.css";
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from "./components/Signin";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
