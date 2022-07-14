import React, { useEffect, useState } from 'react';
import './featured.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';

const Featured = ({ type, setGenre }) => {
	const [content, setContent] = useState({});

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios(
					`http://localhost:8800/api/movies/random/${
						type ? 'type=' + type : ''
					}`,
					{
						headers: {
							authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2U1MmJjMjZiYWRjZmI4OGM0YzUyNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzY5NDkwNCwiZXhwIjoxNjU4MTI2OTA0fQ.UXNhf4gmOf_FfoH_J8Gd49S3PQZ3gefK96CDt2rCrsQ',
						},
					},
				);
				setContent(res.data[0]);
			} catch (error) {
				console.log(error);
			}
		};

		getRandomContent();
	}, [type]);

	return (
		<div className='featured'>
			{type && (
				<div className='category'>
					<span>{type === 'movie' ? 'Movies' : 'Series'}</span>
					<select
						name='genre'
						id='genre'
						onChange={(e) => setGenre(e.target.value)}
					>
						<option>Genre</option>
						<option value='adventure'>Adventure</option>
						<option value='comedy'>Comedy</option>
						<option value='crime'>Crime</option>
						<option value='fantasy'>Fantasy</option>
						<option value='historical'>Historical</option>
						<option value='horror'>Horror</option>
						<option value='romance'>Romance</option>
						<option value='sci-fi'>Sci-fi</option>
						<option value='thriller'>Thriller</option>
						<option value='western'>Western</option>
						<option value='animation'>Animation</option>
						<option value='drama'>Drama</option>
						<option value='documentary'>Documentary</option>
					</select>
				</div>
			)}

			<img src={content.img} alt='' />
			<div className='info'>
				<img src={content.imgTitle} alt='' />
				<span className='desc'>{content.desc}</span>
				<div className='buttons'>
					<button className='play'>
						<PlayArrowIcon />
						<span>Play</span>
					</button>
					<button className='more'>
						<InfoOutlinedIcon />
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Featured;
