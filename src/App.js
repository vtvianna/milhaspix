import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import PassoUm from "./components/pages/PassoUm";
import PassoDois from "./components/pages/PassoDois";




function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={< PassoUm />} />
          <Route path="/passodois" element={< PassoDois />} />
          
        
       
        </Routes>
      
      
    </Router>
  )
}

export default App;
