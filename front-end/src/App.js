import './App.css';
import Layout from './components/UI/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import Achat from "./components/Achat";
import Contact from "./components/Contact";
import CarDetails from './components/CarDetails/index';
import SlidePics from './components/SlidePics';
import ConnexionForm from './components/Connexion';
import RegisterForm from './components/Register';
import ScrollToTop from './components/hook/ScrollToTop';
import DashBoard from './components/DashBoard/DashBoard';
import Error from './components/ErrorPage';
import AccueilDashboard from './components/DashBoard/AccueilDashboard';
import AchatDashboard from './components/DashBoard/AchatDashboard';
import FooterDashboard from './components/DashBoard/FooterDashboard';
import DashBoardCarDetail from './components/DashBoardCarDetails';

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route element={<Error />} path='*' />
          <Route element={<FooterDashboard />} path='/dashboard/footer' />
          <Route element={<DashBoardCarDetail/>} path='/dashboard/achat/details/:id' />
          <Route element={<AchatDashboard />} path='/dashboard/achat' />
          <Route element={<AccueilDashboard />} path='/dashboard/accueil' />
          <Route element={<DashBoard />} path='/dashboard' />
          <Route element={<RegisterForm />} path='/register' />
          <Route element={<ConnexionForm />} path='/connexion' />
          <Route element={<Contact />} path='/contactez-nous' />
          <Route element={<CarDetails />} path='/achat/details/:id' />
          <Route element={<SlidePics />} path='/achat/pics/:id' />
          <Route element={<Achat />} path='/achat' />
          <Route element={<Accueil />} path='/' />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
