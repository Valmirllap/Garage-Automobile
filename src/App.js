import './App.css';
import Layout from './components/UI/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import Achat from "./components/Achat";
import Contact from "./components/Contact";
import Connexion from './components/Connexion';
import DetailsCar from './components/DetailsCar';



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Connexion/>} path='/connexion'/>
          <Route element={<Contact/>} path='/contact'/>
          <Route element={<DetailsCar/>} path='/achat/details'/>
          <Route element={<Achat/>} path='/achat'/>
          <Route element={<Accueil/>} path='/'/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
