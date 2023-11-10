import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Signup from '../pages/Signup';
import Header from '../components/Header';
const Routers = () => {
    return ( 
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/signin' element={<Signin/>}/>
                    <Route exact path='/signup' element={<Signup/>}/>
                    <Route exact path='/profile' element={<Profile/>}/>
                    <Route exact path='/about' element={<About/>}/>
                </Routes>
            </Router>
        </>
     );
}
 
export default Routers;