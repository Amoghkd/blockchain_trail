//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './containers/index';
import FunctionCallPage from './components/functioncall/index';
import Home from './components/home/homepage' ;
import FunctionCallForm from './components/functioncall/functioncallform';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
        <Route  path="/dashboard" element={<Dashboard/>} />
        <Route path="/call-function" element={<FunctionCallPage/>} />
        <Route path="/historyandparams" element={<FunctionCallForm/>} />
      </Routes>
    </Router>
  );
}

export default App;

//App.js focuses on component logic and structure.
/*In essence, App.js defines the building blocks of your application,
 while index.js brings those blocks together and displays them on the webpage.
 Organization: Separating the component logic from the rendering process 
 improves code organization and maintainability.
 */
