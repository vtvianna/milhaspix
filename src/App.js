import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import PassoUm from "./components/pages/PassoUm";
import PassoDois from "./components/pages/PassoDois";
import PassoTres from "./components/pages/PassoTres";



function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={< PassoUm />} />
          <Route path="/passodois" element={< PassoDois />} />
           <Route path="/passotres" element={< PassoTres />} />
          
        
       
        </Routes>
      
      
    </Router>
  )
}

export default App;
