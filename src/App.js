import React from 'react';
import {Route, Routes} from 'react-router-dom'
import './App.css';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const Shop = () =>(
  <div>
    <h1>SHOP PAGE</h1>
  </div>

  )

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />}/>
          <Route path='auth' element={<Authentication />}/>
        </Route>
      </Routes>
    );
  }
}

export default App;
