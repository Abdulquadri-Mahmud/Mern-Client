import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Profile from '../src/pages/Profile';
import Signin from '../src/pages/Signin';
import Signup from '../src/pages/Signup';
import Header from '../src/components/Header';
import PrivateRoute from '../src/components/PrivateRoute';

const Routers = () => {
    return ( 
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/signin' element={<Signin/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path='/profile' element={<Profile/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
     );
}
 
export default Routers;