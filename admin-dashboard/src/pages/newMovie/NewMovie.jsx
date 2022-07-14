import React from 'react';
import { useState } from 'react';
import './newMovie.css';
import { createMovie } from '../../api/apiCalls';
import { useContext } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useNavigate } from 'react-router-dom';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';

/** @type {any} */
const metadata = {
	contentType: 'image/jpeg',
};

const NewMovie = () => {
	// text and select input
	const [movie, setMovie] = useState(null);
	const { dispatch } = useContext(MovieContext);
	const navigate = useNavigate();

	// file input
	const [img, setImg] = useState(null);
	const [imgTitle, setImgTitle] = useState(null);
	const [imgSm, setImgSm] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [video, setVideo] = useState(null);
	const [uploaded, setUploaded] = useState(0);

	const handleChange = (e) => {
		setMovie({ ...movie, [e.target.name]: e.target.value });
	};

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;

			const storage = getStorage(app);

			const storageRef = ref(storage, fileName);

			const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setMovie((prev) => {
							return { ...prev, [item.label]: downloadURL };
						});
						setUploaded((prev) => prev + 1);
					});
				},
			);
		});
	};

	// Upload files
	const handleUpload = (e) => {
		e.preventDefault();

		upload([
			{ file: img, label: 'img' },
			{ file: imgTitle, label: 'imgTitle' },
			{ file: imgSm, label: 'imgSm' },
			{ file: trailer, label: 'trailer' },
			{ file: video, label: 'video' },
		]);
	};

	const handleCreate = (e) => {
		e.preventDefault();

		createMovie(movie, dispatch);

		navigate('/movies');
	};

	return (
		<div className='newProduct'>
			<h1 className='addProductTitle'>New Movie</h1>
			<form className='addProductForm'>
				<div className='addProductItem'>
					<label>Image</label>
					<input
						type='file'
						id='img'
						name='img'
						onChange={(e) => setImg(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Title image</label>
					<input
						type='file'
						id='imgTitle'
						name='imgTitle'
						onChange={(e) => setImgTitle(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Thumbnail image</label>
					<input
						type='file'
						id='imgSm'
						name='imgSm'
						onChange={(e) => setImgSm(e.target.files[0])}
					/>
				</div>
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
					<label>Description</label>
					<input
						type='text'
						placeholder='descritption'
						name='desc'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Year</label>
					<input
						type='text'
						placeholder='Year'
						name='year'
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
					<label>Duration</label>
					<input
						type='text'
						placeholder='Duration'
						name='duration'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Limit</label>
					<input
						type='number'
						placeholder='Limit'
						name='limit'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Trialer</label>
					<input
						type='file'
						name='trialer'
						onChange={(e) => setTrailer(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Video</label>
					<input
						type='file'
						name='video'
						onChange={(e) => setVideo(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Is Series?</label>
					<select name='isSeries' id='isSeries' onChange={handleChange}>
						<option value='false'>No</option>
						<option value='true'>Yes</option>
					</select>
				</div>
				{uploaded === 5 ? (
					<button className='addProductButton' onClick={handleCreate}>
						Create
					</button>
				) : (
					<button className='addProductButton' onClick={handleUpload}>
						Uplaod
					</button>
				)}
			</form>
		</div>
	);
};

export default NewMovie;
