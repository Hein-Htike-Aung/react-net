import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import ReportIcon from '@mui/icons-material/Report';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebarWrapper'>
				<div className='sidebarMenu'>
					<h3 className='sidebarTitle'>Dashboard</h3>
					<ul className='sidebarList'>
						<Link className='link' to={'/'}>
							<li className='sidebarListItem active'>
								<LineStyleIcon className='sidebarIcon' /> Home
							</li>
						</Link>
						<li className='sidebarListItem'>
							<TimelapseIcon className='sidebarIcon' /> Analytics
						</li>
						<li className='sidebarListItem'>
							<TrendingUpIcon className='sidebarIcon' /> Sales
						</li>
					</ul>
				</div>

				<div className='sidebarMenu'>
					<h3 className='sidebarTitle'>Quick Menu</h3>
					<ul className='sidebarList'>
						<Link className='link' to={`/users`}>
							<li className='sidebarListItem '>
								<PermIdentityIcon className='sidebarIcon' /> Users
							</li>
						</Link>
						<Link className='link' to={`/movies`}>
							<li className='sidebarListItem'>
								<PlayCircleFilledWhiteOutlinedIcon className='sidebarIcon' />
								Movies
							</li>
						</Link>
						<Link className='link' to={`/list`}>
							<li className='sidebarListItem'>
								<FormatListBulletedIcon className='sidebarIcon' /> List
							</li>
						</Link>
						<li className='sidebarListItem'>
							<BarChartIcon className='sidebarIcon' /> Resports
						</li>
					</ul>
				</div>

				<div className='sidebarMenu'>
					<h3 className='sidebarTitle'>Notification</h3>
					<ul className='sidebarList'>
						<li className='sidebarListItem '>
							<MailOutlineIcon className='sidebarIcon' /> Mail
						</li>
						<li className='sidebarListItem'>
							<DynamicFeedIcon className='sidebarIcon' /> Feedback
						</li>
						<li className='sidebarListItem'>
							<ChatBubbleOutlineIcon className='sidebarIcon' /> Messages
						</li>
					</ul>
				</div>

				<div className='sidebarMenu'>
					<h3 className='sidebarTitle'>Staff</h3>
					<ul className='sidebarList'>
						<li className='sidebarListItem '>
							<WorkOutlineIcon className='sidebarIcon' /> Manage
						</li>
						<li className='sidebarListItem'>
							<TimelapseIcon className='sidebarIcon' /> Analytics
						</li>
						<li className='sidebarListItem'>
							<ReportIcon className='sidebarIcon' /> ReportIcon
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
