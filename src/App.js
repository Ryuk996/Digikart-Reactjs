import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './PublicContext'
import Header from './Components/Topbar/Topbar';
import Routepage from './Pages/Routepage';


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="mainFixed">
          <Routepage></Routepage>
          </div>
        </div> 
      </Router>
    </DataProvider>
  );
}

export default App;
