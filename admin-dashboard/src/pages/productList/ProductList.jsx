import React, { useState } from 'react';
import './productList.css';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { productRows } from '../../dummyData';

const ProductList = () => {
	const [data, setData] = useState(productRows);

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'product',
			headerName: 'Product',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='productListItem'>
						<img className='productListImg' src={params.row.img} alt='' />
						{params.row.name}
					</div>
				);
			},
		},
		{ field: 'stock', headerName: 'Stock', width: 200 },
		{
			field: 'status',
			headerName: 'Status',
			width: 130,
		},
		{
			field: 'price',
			headerName: 'Price',
			width: 160,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/product/${params.row.id}`}>
							<button className='productListEdit'>Edit</button>
						</Link>
						<DeleteOutlineIcon
							onClick={() => handleDelete(params.row.id)}
							className='productListDelete'
						></DeleteOutlineIcon>
					</>
				);
			},
		},
	];

	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
	};

	return (
		<div className='productList'>
			<DataGrid
				rows={data}
				columns={columns}
				disableSelectionOnClick
				pageSize={8}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
};

export default ProductList;
