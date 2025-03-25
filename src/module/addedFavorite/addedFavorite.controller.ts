import catchAsync from '../../utils/catchAsync';
import AddedFavoriteModel from './addedFavorite.model';
import { AddedFavoriteServices } from './addedFavorite.service';


// create favorite controller
const createFavorite = catchAsync(async (req, res) => {
    const favorite = req.body;
    const existProduct = await AddedFavoriteModel.findOne({
        email: favorite?.email,
        product: favorite?.product
    });

    if (existProduct) {
        res.status(200).json({
            success: true,
            message: 'Product already in the favorite.',
            data: existProduct,
        });
        return
    }

    const result = await AddedFavoriteServices.addFavoriteIntoDB(favorite);
    res.status(200).json({
        message: 'Added to favorites successfully',
        success: true,
        data: result,
    });
});

// get all favorite
const getAllFavorite = catchAsync(async (req, res) => {
    const result = await AddedFavoriteServices.getAllAddedFavoritesFromDB(
        req.query,
    );

    res.status(200).json({
        message: 'Favorite are retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    })
});

// get specif favorite
const getSpecifFavorite = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AddedFavoriteServices.getSingleAddedFavoriteFromDB(id);
    res.status(200).json({
        message: 'Favorite retrieved successfully',
        success: true,
        data: result,
    })
})

// delete favorite
const deleteFavorite = catchAsync(async (req, res) => {
    const { id } = req.params;
    await AddedFavoriteServices.deleteAddedFavoriteFromDB(id);
    res.status(200).json({
        message: 'Favorite deleted successfully',
        success: true,
        data: {},
    })
});

export const FavoriteControllers = {
    createFavorite,
    getAllFavorite,
    getSpecifFavorite,
    deleteFavorite
};
