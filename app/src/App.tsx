import React from 'react';
import './App.css';
import './assets/css/style.css';
import {BrowserRouter} from "react-router-dom";
import Topbar from "./components/common/Topbar";
import CartRouter from "./router/CartRouter";
import Footer from "./components/common/Footer";
import ContactUsRouter from "./router/ContactUsRouter";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Topbar/>
                <CartRouter/>
                <ContactUsRouter/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;