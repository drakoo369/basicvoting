import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Voting from "./components/Voting/Voting";


function App() {


  return (
    <Router>
      
        <Routes>

          {/*HOME*/}
          <Route
            exact
            path="/"
            element={
              <>
                <Voting />
              </>
            }
          />
        
        </Routes>
     
    </Router>
  );
}

export default App;
