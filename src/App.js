import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import PassoUm from "./components/pages/PassoUm";
import PassoDois from "./components/pages/PassoDois";
import PassoTres from "./components/pages/PassoTres";
import PassoQuatro from "./components/pages/PassoQuatro";
import ListaOfertas from "./components/pages/ListaOfertas";



function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={< PassoUm />} />
          <Route path="/passodois" element={< PassoDois />} />
           <Route path="/passotres" element={< PassoTres />} />
           <Route path="/passoquatro" element={< PassoQuatro />} />
           <Route path="/listaofertas" element={< ListaOfertas />} />
          
        
       
        </Routes>
      
      
    </Router>
  )
}

export default App;
