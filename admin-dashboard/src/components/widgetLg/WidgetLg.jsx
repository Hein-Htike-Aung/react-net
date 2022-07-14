import React from 'react';
import './widgetLg.css';

const WidgetLg = () => {
	const Button = ({ type }) => {
		return <button className={'widgetLgButton ' + type}>{type}</button>;
	};

	return (
		<div className='widgetLg'>
			<h3 className='widgetLgTitle'>Latests transactions</h3>
			<table className='widgetLgTable'>
				<thead>
					<tr className='widgetLgTr'>
						<th className='widgetLgTh'>Customer</th>
						<th className='widgetLgTh'>Date</th>
						<th className='widgetLgTh'>Amount</th>
						<th className='widgetLgTh'>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr className='widgetLgTr'>
						<td className='widgetLgUser'>
							<img
								src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt=''
								className='widgetLgImg'
							/>
							<span className='widgetLgName'>Susan Carol</span>
						</td>
						<td className='widgetLgDate'>2 Jun 2021</td>
						<td className='widgetLgAmount'>$ 112.22</td>
						<td className='widgetLgStatus'>
							<Button type={'Approved'}></Button>
						</td>
					</tr>
					<tr className='widgetLgTr'>
						<td className='widgetLgUser'>
							<img
								src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt=''
								className='widgetLgImg'
							/>
							<span className='widgetLgName'>Susan Carol</span>
						</td>
						<td className='widgetLgDate'>2 Jun 2021</td>
						<td className='widgetLgAmount'>$ 112.22</td>
						<td className='widgetLgStatus'>
							<Button type={'Declined'}></Button>
						</td>
					</tr>
					<tr className='widgetLgTr'>
						<td className='widgetLgUser'>
							<img
								src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt=''
								className='widgetLgImg'
							/>
							<span className='widgetLgName'>Susan Carol</span>
						</td>
						<td className='widgetLgDate'>2 Jun 2021</td>
						<td className='widgetLgAmount'>$ 112.22</td>
						<td className='widgetLgStatus'>
							<Button type={'Pending'}></Button>
						</td>
					</tr>
					<tr className='widgetLgTr'>
						<td className='widgetLgUser'>
							<img
								src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt=''
								className='widgetLgImg'
							/>
							<span className='widgetLgName'>Susan Carol</span>
						</td>
						<td className='widgetLgDate'>2 Jun 2021</td>
						<td className='widgetLgAmount'>$ 112.22</td>
						<td className='widgetLgStatus'>
							<Button type={'Approved'}></Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default WidgetLg;
