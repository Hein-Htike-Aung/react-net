import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { AuthContext } from './authContext/AuthContext';

const App = () => {
	const { user } = useContext(AuthContext);

	return (
		<Routes>
			<Route path='/' element={user ? <Home /> : <Register />} />
			<Route path='/register' element={!user ? <Register /> : <Home />} />
			<Route path='/login' element={!user ? <Login /> : <Home />} />
			{user && (
				<>
					<Route path='/movies' element={<Home type='movie' />} />
					<Route path='/series' element={<Home type='series' />} />
					<Route path='/watch' element={<Watch />} />
				</>
			)}
		</Routes>
	);
};

export default App;
