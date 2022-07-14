import React, { useEffect, useState } from 'react';
import './listItem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListItem = ({ index, item }) => {
	const [isHovered, setIsHovered] = useState(false);

	const [movie, setMovie] = useState({});

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get(
					`http://localhost:8800/api/movies/find/${item}`,
					{
						headers: {
							authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2U1MmJjMjZiYWRjZmI4OGM0YzUyNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzY5NDkwNCwiZXhwIjoxNjU4MTI2OTA0fQ.UXNhf4gmOf_FfoH_J8Gd49S3PQZ3gefK96CDt2rCrsQ',
						},
					},
				);

				setMovie(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		getMovie();
	}, [item]);

	return (
		<Link to='/watch' state={{ movie }}>
			<div
				className='listItem'
				style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={movie.img} alt='' />

				{isHovered && (
					<>
						<video src={movie.trailer} autoPlay={true} loop></video>
						<div className='itemInfo'>
							<div className='icons'>
								<PlayArrowIcon className='icon' />
								<AddIcon className='icon' />
								<ThumbUpOutlinedIcon className='icon' />
								<ThumbDownAltOutlinedIcon className='icon' />
							</div>
							<div className='itemInfoTop'>
								<span>{movie.duration}</span>
								<span className='limit'>+{movie.limit}</span>
								<span>{movie.year}</span>
							</div>
							<div className='desc'>{movie.desc}</div>
							<div className='genre'>{movie.genre}</div>
						</div>
					</>
				)}
			</div>
		</Link>
	);
};

export default ListItem;
