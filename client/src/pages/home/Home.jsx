import React, { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import axios from 'axios';

const Home = ({ type }) => {
	const [list, setList] = useState([]);
	const [genre, setGenre] = useState();

	useEffect(() => {
		const getRandomLists = async () => {
			try {
				const res = await axios.get(
					`http://localhost:8800/api/list${type ? '?type=' + type : ''}${
						genre ? '&genre=' + genre : ''
					}`,
					{
						headers: {
							authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2U1MmJjMjZiYWRjZmI4OGM0YzUyNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzY5NDkwNCwiZXhwIjoxNjU4MTI2OTA0fQ.UXNhf4gmOf_FfoH_J8Gd49S3PQZ3gefK96CDt2rCrsQ',
						},
					},
				);

				setList(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getRandomLists();
	}, [genre, type]);

	return (
		<div className='home'>
			<Navbar />
			<Featured type={type} setGenre={setGenre} />
			{list.map((list, index) => (
				<List key={index} list={list} />
			))}
		</div>
	);
};

export default Home;
