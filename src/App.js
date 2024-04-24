import logo from './logo.svg';
import './App.css';
import Startpage from './components/Startpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questions from './components/Questions';
import Storypage from './components/Storypage';
import Analysis from './components/Analysis';


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<Startpage />} ></Route>
          <Route path='/question' element={<Questions />} ></Route>
          <Route path='/Storypage' element={<Storypage />} ></Route>
          <Route path='//Analysis' element={<Analysis />} ></Route>


        </Routes>
      </Router>
    </>
  );
}

export default App;
