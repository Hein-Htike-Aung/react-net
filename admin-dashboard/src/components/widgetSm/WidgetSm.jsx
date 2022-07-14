import React, { useEffect, useState } from 'react';
import './widgetSm.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const WidgetSm = () => {
	const [newUsers, setNewUsers] = useState([]);

	useEffect(() => {
		const getNewUsers = async () => {
			try {
				const res = await axios.get(`http://localhost:8800/api/users?new`, {
					headers: {
						authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2U1MmJjMjZiYWRjZmI4OGM0YzUyNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzY5NDkwNCwiZXhwIjoxNjU4MTI2OTA0fQ.UXNhf4gmOf_FfoH_J8Gd49S3PQZ3gefK96CDt2rCrsQ',
					},
				});

				setNewUsers(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		getNewUsers();
	}, []);

	return (
		<div className='widgetSm'>
			<span className='widgetSmTitle'>New Join Members</span>
			<ul className='widgetSmList'>
				{newUsers.map((user) => (
					<li key={user._id} className='widgetSmListItem'>
						<img
							src={
								user.profilePic ||
								'http://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2022/01/20-smiling-face-emoji-coloring-page.png'
							}
							alt=''
							className='widgetSmImg'
						/>
						<div className='widgetSmUser'>
							<span className='widgetSmUsername'>{user.username}</span>
						</div>
						<button className='widgetSmButton'>
							<VisibilityIcon className='widgetSmIcon' />
							Dispaly
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WidgetSm;
