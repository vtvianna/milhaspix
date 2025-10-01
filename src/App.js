import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from "./components/layout/Header";
import PassoUm from './components/pages/PassoUm';



function App() {
  return (
  <Router>


    
      <Header>    
        <Routes>
          <Route path="/"  />
        </Routes>
      </Header>
      <PassoUm/>
    </Router>

   
  )
}

export default App;
