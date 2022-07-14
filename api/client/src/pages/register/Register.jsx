import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config';
import './register.scss';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();

	const handleStart = () => {
		setEmail(emailRef.current.value);
	};
	const handleFinish = async (e) => {
		e.preventDefault();

		setPassword(passwordRef.current.value);
		setUsername(usernameRef.current.value);
		try {
			await axiosInstance.post('/auth/register', { username, email, password });
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='register'>
			<div className='top'>
				<div className='wrapper'>
					<img
						className='logo'
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
						alt=''
					/>
					<button className='loginButton'>Sign In</button>
				</div>
				<div className='container'>
					<h1>Unlimited movies, TV shows, and more.</h1>
					<h2>Watch anywhere. Cancel anytime.</h2>
					<p>
						Ready to watch? Enter your email to create or restart your
						membership.
					</p>
					{!email ? (
						<div className='input'>
							<input type='email' placeholder='email address' ref={emailRef} />
							<button className='registerButton' onClick={handleStart}>
								Get Started
							</button>
						</div>
					) : (
						<form className='input'>
							<input type='username' placeholder='Username' ref={usernameRef} />
							<input type='password' placeholder='Password' ref={passwordRef} />
							<button className='registerButton' onClick={handleFinish}>
								Start
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default Register;