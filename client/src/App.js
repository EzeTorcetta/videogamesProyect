import './App.css';
import { Route, Routes } from "react-router-dom";
import { Detail, Home, Form, Landing } from "./views"
import NavBar from './Components/NavBar/NavBar'
import { useLocation } from 'react-router-dom';

function App() {

  const pathname = useLocation().pathname

  //! RENDER: 
  return (
    <div className="App">

      {pathname !== "/" ?
        <NavBar /> :
        <div className="video-container">
          <video muted={true} autoPlay loop>
            <source src="./background.mp4" type="video/mp4" />
          </video>
        </div>
      }

      <div className="OtherRoutesContainer">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
