import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ContactSection from './Components/ContactSection/ContactSection';
import AboutPage from './Components/AboutPage/AboutPage';
import HomePage from './Components/HomePage/HomePage';


//React Router dependencies
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderPage from './Components/HeaderPage/HeaderPage';
import FooterPage from './Components/FooterPage/FooterPage';

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderPage />
        <Navbar />
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/contacts" exact component={() => <ContactSection />} />
          <Route path="/about" exact component={() => <AboutPage />} />
        </Switch>
        <FooterPage></FooterPage>
      </Router>
    </div>
  );
}

export default App;
