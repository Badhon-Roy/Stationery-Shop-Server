
import QueryBuilder from '../../builder/QueryBuilder';
import { TAddedFavorite } from './addedFavorite.interface';
import AddedFavoriteModel from './addedFavorite.model';

// add favorite
const addFavoriteIntoDB = async (favorite: TAddedFavorite) => {
    const result = await AddedFavoriteModel.create(favorite);
    return result;
};


// all added favorite get
const getAllAddedFavoritesFromDB = async (
    query: Record<string, unknown>,
) => {
    const addedFavoriteQuery = new QueryBuilder(AddedFavoriteModel.find()
        .populate("product"), query)
        .search(['email'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await addedFavoriteQuery.modelQuery;
    const meta = await addedFavoriteQuery.countTotal();

    return {
        meta,
        result,
    };
};



// specif added favorite get
const getSingleAddedFavoriteFromDB = async (id: string) => {
    const result = await AddedFavoriteModel.findById(id).populate("product");
    return result;
};


const deleteAddedFavoriteFromDB = async (id: string) => {
    const result = await AddedFavoriteModel.findByIdAndDelete(id);
    return result;
};



export const AddedFavoriteServices = {
    addFavoriteIntoDB,
    getAllAddedFavoritesFromDB,
    getSingleAddedFavoriteFromDB,
    deleteAddedFavoriteFromDB
};
