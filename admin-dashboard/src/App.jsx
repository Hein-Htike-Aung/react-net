import React, { useContext } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './app.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import { AuthContext } from './context/authContext/AuthContext';
import Home from './pages/home/Home';
import MovieListList from './pages/movieListList/MovieListList';
import Login from './pages/login/Login';
import Movie from './pages/movie/Movie';
import MovieList from './pages/movieList/MovieList';
import NewMovie from './pages/newMovie/NewMovie';
import NewList from './pages/newList/NewList';
import NewUser from './pages/newUser/NewUser';
import User from './pages/user/User';
import UserList from './pages/userList/UserList';
import List from './pages/list/List';

const App = () => {
	const { user } = useContext(AuthContext);

	const Layout = () => (
		<>
			<Topbar />
			<div className='container'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);

	return (
		<Routes>
			<Route path='/login' element={user ? <Home /> : <Login />} />
			<Route element={user ? <Layout /> : <Login />}>
				<Route path='/' element={<Home />} />
				<Route path='/users' element={<UserList />} />
				<Route path='/user/:userId' element={<User />} />
				<Route path='/newUser' element={<NewUser />} />
				<Route path='/movies' element={<MovieList />} />
				<Route path='/movie/:movieId' element={user ? <Movie /> : <Login />} />
				<Route path='/newMovie' element={user ? <NewMovie /> : <Login />} />
				<Route path='/list' element={<MovieListList />} />
				<Route path='/list/:listId' element={user ? <List /> : <Login />} />
				<Route path='/newList' element={user ? <NewList /> : <Login />} />
			</Route>
		</Routes>
	);
};

export default App;
