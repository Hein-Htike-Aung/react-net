import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../../api/apiCalls';
import { createList } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext';
import './newList.css';

const NewList = () => {
	// text and select input
	const [list, setList] = useState(null);
	const { dispatch: disptachList } = useContext(ListContext);
	const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
	const navigate = useNavigate();

	useEffect(() => {
		getMovies(dispatchMovie);
	}, [dispatchMovie]);

	const handleChange = (e) => {
		setList({ ...list, [e.target.name]: e.target.value });
	};

	const handleSelect = (e) => {
		// multiselect
		let value = Array.from(e.target.selectedOptions, (option) => option.value);

		setList({ ...list, [e.target.name]: value });
	};

	const handleCreate = (e) => {
		e.preventDefault();

		createList(list, disptachList);

		navigate('/list');
	};

	return (
		<div className='newProduct'>
			<h1 className='addProductTitle'>New List</h1>
			<form className='addProductForm'>
				<div className='wrapper'>
					<div className='left'>
						<div className='addProductItem'>
							<label>Title</label>
							<input
								type='text'
								placeholder='Title'
								name='title'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Genre</label>
							<input
								type='text'
								placeholder='Genre'
								name='genre'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Type</label>
							<select name='type' onChange={handleChange}>
								<option>Type</option>
								<option value='movie'>Movie</option>
								<option value='series'>Series</option>
							</select>
						</div>
						<button className='addProductButton' onClick={handleCreate}>
							Create
						</button>
					</div>
					<div className='right'>
						<div className='addProductItem'>
							<label>Content</label>
							<select
								multiple
								name='content'
								onChange={handleSelect}
								className='moviesSelect'
							>
								{movies.map((m) => (
									<option key={m._id} value={m._id}>
										{m.title}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewList;
