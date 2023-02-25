import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SmoothieList from './components/SmoothieList';
import SmoothieDetailsEdit from './components/SmoothieDetailsEdit';
import SmoothieDetailsView from './components/SmoothieDetailsView';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/smoothies/:option' exact={true} element={<SmoothieList/>}/>
        <Route path='/smoothies/:id' element={<SmoothieDetailsEdit/>}/>
        <Route path='/smoothies/edit/:id' element={<SmoothieDetailsEdit/>}/>
        <Route path='/smoothies/view/:id' element={<SmoothieDetailsView/>}/>
      </Routes>
    </Router>
  )
}

export default App;
