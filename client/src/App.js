import './App.css';
import { Route, Routes, useLocation} from 'react-router-dom';
import { Home, Landing, Detail, Form} from './Views';
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <div className="App">

        {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route exact path='/' element={ <Landing/> }/>
        <Route path='/home' element={ <Home/> }/>
        <Route exact path='/detail/:id' element={ <Detail/> }/>
        <Route exact path='/create' element={ <Form/> }/>
      </Routes>

    </div>
  );
};

export default App;
