import React from 'react';
import './watch.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
	const { movie } = useLocation().state;

	return (
		<div className='watch'>
			<Link to='/'>
				<div className='back'>
					<ArrowBackIcon />
					Home
				</div>
			</Link>

			<video
				className='video'
				autoplays='true'
				progress='true'
				controls
				src={movie.video}
			/>
		</div>
	);
};

export default Watch;
