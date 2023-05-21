import './App.css';
import { Route, Routes, useLocation} from 'react-router-dom';
import { Home, Landing, Detail, Form} from './Views';


function App() {
  const location = useLocation();

  return (
    <div className="App">

   

      <Routes>
        <Route exact path='/' element={ <Landing/> }/>
        <Route path='/home' element={ <Home/> }/>
        <Route exact path='/home/:id' element={ <Detail/> }/>
        <Route exact path='/create' element={ <Form/> }/>
      </Routes>

    </div>
  );
};

export default App;
