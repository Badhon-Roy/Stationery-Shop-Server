import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

const CategoryModel = model<TCategory>(
    'Category',
    categorySchema,
);
export default CategoryModel;
