import mongoose, { model, Schema } from 'mongoose';
import { TAddedCart } from './addedCart.interface';

const addedCartSchema = new Schema<TAddedCart>(
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
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'StationeryProducts', required: true },
                quantity: { 
                    type: Number, 
                    required: true, 
                    default: 1,
                    min: [1, 'Quantity must be at least 1'],
                    max: [10, 'Quantity maximum 10'],
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const AddedCartModel = model<TAddedCart>('AddedCart', addedCartSchema);
export default AddedCartModel;
