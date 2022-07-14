import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteMovie, getMovies } from '../../api/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import './movieList.css';

const MovieList = () => {
	const { movies, dispatch } = useContext(MovieContext);

	useEffect(() => {
		getMovies(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteMovie(id, dispatch);
	};

	const columns = [
		{ field: '_id', headerName: 'ID', width: 70 },
		{
			field: 'movie',
			headerName: 'Movie',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='productListItem'>
						<img className='productListImg' src={params.row.img} alt='' />
						{params.row.title}
					</div>
				);
			},
		},
		{ field: 'genre', headerName: 'Genre', width: 120 },
		{ field: 'year', headerName: 'Year', width: 120 },
		{ field: 'limit', headerName: 'Limit', width: 120 },
		{ field: 'isSeries', headerName: 'Series', width: 120 },
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/movie/${params.row._id}`} state={{ movie: params.row }}>
							<button className='productListEdit'>Edit</button>
						</Link>
						<DeleteOutlineIcon
							onClick={() => handleDelete(params.row._id)}
							className='productListDelete'
						></DeleteOutlineIcon>
					</>
				);
			},
		},
	];

	return (
		<div className='productList'>
			<DataGrid
				rows={movies}
				disableSelectionOnClick
				columns={columns}
				pageSize={8}
				checkboxSelection
				getRowId={(r) => r._id}
				rowsPerPageOptions={[8]}
			/>
		</div>
	);
};

export default MovieList;
