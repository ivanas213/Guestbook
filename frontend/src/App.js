import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import NewMessage from "./pages/NewMessage"

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/add" element = {<NewMessage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
