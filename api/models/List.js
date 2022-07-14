import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		type: { type: String }, // movie, series
		genre: { type: String }, // action, comedy, crime
		content: { type: Array }, // Movie ids
	},
	{ timestamps: true },
);

export default mongoose.model('List', ListSchema);
