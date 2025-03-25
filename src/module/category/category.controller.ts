import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';




// create category controller
const createCategory = catchAsync(async (req, res) => {
    const category = req.body;
    const result = await CategoryServices.createCategoryIntoDB(category);
    res.status(200).json({
        message: 'Category created successfully',
        success: true,
        data: result,
    })
})

// get all Category
const getAllCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoryFromDB(
        req.query,
    );

    res.status(200).json({
        message: 'Category are retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    })
});




// get specif Category
const getSpecifCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryServices.getSpecifCategoryFromDB(id);
    res.status(200).json({
        message: 'Category retrieved successfully',
        success: true,
        data: result,
    })
})

// update Category
const updateCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await CategoryServices.updateCategoryFromDB(
        id,
        data,
    );
    res.status(200).json({
        message: 'Category updated successfully',
        success: true,
        data: result,
    });

})


// delete Category
const deleteCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    await CategoryServices.deleteCategoryFromDB(id);
    res.status(200).json({
        message: 'Category deleted successfully',
        success: true,
        data: {},
    })
});

export const CategoryControllers = {
    createCategory,
    getSpecifCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
};
