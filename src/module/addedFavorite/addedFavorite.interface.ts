import mongoose from 'mongoose';

export type TAddedFavorite = {
    email: string;
    product: mongoose.Types.ObjectId;
};
