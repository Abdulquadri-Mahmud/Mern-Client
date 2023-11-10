import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Profile from '../src/pages/Profile';
import Signin from '../src/pages/Signin';
import Signup from '../src/pages/Signup';
import Header from '../src/components/Header';

const Routers = () => {
    return ( 
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/' element={<About/>}/>
                    <Route path='/' element={<Profile/>}/>
                    <Route path='/' element={<Signin/>}/>
                    <Route path='/' element={<Signup/>}/>
                </Routes>
            </Router>
        </>
     );
}
 
export default Routers;