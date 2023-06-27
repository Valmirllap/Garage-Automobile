import './App.css';
import Layout from './components/UI/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import Achat from "./components/Achat";
import Contact from "./components/Contact";
import Connexion from './components/Connexion';
import CarDetails from './components/CarDetails/index';
import SlidePics from './components/SlidePics';
import ScrollToTop from './components/hook/ScrollToTop';
import Register from './components/Register';

function App() {

  return (
    <Router>
      <ScrollToTop/>
      <Layout>
        <Routes>
          <Route element={<Register/>} path='/register' />
          <Route element={<Connexion/>} path='/connexion'/>
          <Route element={<Contact/>} path='/contactez-nous'/>
          <Route element={<CarDetails/>} path='/achat/details/:id'/>
          <Route element={<SlidePics/>} path='/achat/pics/:id'/>
          <Route element={<Achat/>} path='/achat'/>
          <Route element={<Accueil/>} path='/'/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
