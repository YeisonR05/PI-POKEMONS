import './App.css';
import { Route, Routes} from 'react-router-dom';
import Landing from './components/LandingPage/landingPage';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path='/' element={<Landing/>}/>
      </Routes>
      
    </div>
  );
};

export default App;
