import React, { useEffect, useRef, useState } from 'react';
import './list.scss';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItem from '../listItem/ListItem';

const List = ({ list }) => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [isMoved, setIsMoved] = useState(false);
	// 230 is item width
	const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

	const listRef = useRef();

	const handleSlide = (direction) => {
		setIsMoved(true);
		// arrow is 50px
		let distance = listRef.current.getBoundingClientRect().x - 50;

		if (direction === 'left' && slideNumber > 0) {
			setSlideNumber(slideNumber - 1);
			// listItem(225) + margin(5) = 230px
			listRef.current.style.transform = `translateX(${230 + distance}px)`;
		}
		if (direction === 'right' && slideNumber < 10 - clickLimit) {
			setSlideNumber(slideNumber + 1);
			// listItem(225) + margin(5) = 230px
			listRef.current.style.transform = `translateX(${-230 + distance}px)`;
		}
	};

	useEffect(() => {
		if (slideNumber === 0) setIsMoved(false);
	}, [slideNumber]);

	return (
		<div className='list'>
			<div className='listTitle'>{list.title}</div>
			<div className='wrapper'>
				<ArrowBackIosNewOutlinedIcon
					className='sliderArrow left'
					onClick={() => handleSlide('left')}
					style={{ display: !isMoved && 'none' }}
				/>
				<div className='container' ref={listRef}>
					{list.content.map((item, index) => (
						<ListItem key={index} index={index} item={item} />
					))}
				</div>
				<ArrowForwardIosIcon
					onClick={() => handleSlide('right')}
					className='sliderArrow right'
				/>
			</div>
		</div>
	);
};

export default List;
