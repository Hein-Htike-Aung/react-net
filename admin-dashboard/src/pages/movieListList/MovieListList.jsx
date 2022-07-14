import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteList, getLists } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext';
import './movieListList.css';

const MovieListList = () => {
	const { lists, dispatch } = useContext(ListContext);

	useEffect(() => {
		getLists(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteList(id, dispatch);
	};

	const columns = [
		{ field: '_id', headerName: 'ID', width: 250 },
		{ field: 'title', headerName: 'title', width: 250 },
		{ field: 'genre', headerName: 'genre', width: 120 },
		{ field: 'type', headerName: 'type', width: 120 },
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/list/${params.row._id}`} state={{ list: params.row }}>
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
				rows={lists}
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

export default MovieListList;
