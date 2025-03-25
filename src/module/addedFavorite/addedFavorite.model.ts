import mongoose, { model, Schema } from 'mongoose';
import { TAddedFavorite } from './addedFavorite.interface';

const addedFavoriteSchema = new Schema<TAddedFavorite>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            validate: {
                validator: function (value: string) {
                    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
                },
                message: '{VALUE} is not a valid email',
            },
            immutable: true,
        },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'StationeryProducts', required: true },
    },
    {
        timestamps: true,
    }
);

const AddedFavoriteModel = model<TAddedFavorite>('AddedFavorite', addedFavoriteSchema);
export default AddedFavoriteModel;
