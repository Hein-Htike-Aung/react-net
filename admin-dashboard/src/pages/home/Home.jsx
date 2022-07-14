import React, { useEffect, useMemo, useState } from 'react';
import { axiosInstance } from '../../../../api/client/src/config';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import './home.css';

const Home = () => {
	const MONTHS = useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		[],
	);

	const [userStats, setUserStats] = useState([]);

	useEffect(() => {
		const getUsersStats = async () => {
			try {
				const res = await axiosInstance.get('http://localhost:8800/api/users/stats', {
					headers: {
						authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2U1MmJjMjZiYWRjZmI4OGM0YzUyNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzY5NDkwNCwiZXhwIjoxNjU4MTI2OTA0fQ.UXNhf4gmOf_FfoH_J8Gd49S3PQZ3gefK96CDt2rCrsQ',
					},
				});

				const statsList = res.data.sort((a, b) => a._id - b._id);

				statsList.map((item) =>
					setUserStats((prev) => [
						...prev,
						{
							name: MONTHS[item._id - 1],
							'Active User': item.total,
						},
					]),
				);
			} catch (error) {
				console.log(error);
			}
		};

		getUsersStats();
	}, [MONTHS]);

	return (
		<div className='home'>
			<FeaturedInfo />
			<Chart
				title='Users Analytics'
				grid
				data={userStats}
				dataKey='Active User'
			/>
			<div className='homeWidgets'>
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
};

export default Home;
