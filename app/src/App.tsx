import React from 'react';
import './App.css';
import "./assets/css/style.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
        <FontAwesomeIcon icon={faCoffee} />
    </div>
  );
}
export default App;
