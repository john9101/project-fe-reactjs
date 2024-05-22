import React from 'react';
import './App.css';
import './assets/css/style.css';

import {BrowserRouter} from "react-router-dom";
import Topbar from "./components/common/Topbar";
import CartRouter from "./router/CartRouter";
import Footer from "./components/common/Footer";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Topbar/>
          <CartRouter/>
          <Footer/>
        </BrowserRouter>
      </div>
  );
}

export default App;