import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";


//*create blog
const createBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.createBlogIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        data: result
    })
})

//* get all blog post 
const getAllBlog = catchAsync(async (req, res) => {
    const blogs = await BlogServices.getAllBlogFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        meta: blogs.meta,
        data: blogs.result,
    });
});


//* get single all blog post 
const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.getSingleBlogFromDB(id)
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: result
    })
})


//*update blog
const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.updateBlogIntoDB(id, req.body)
    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: result
    })
})

//* delete blog
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    await BlogServices.deleteBlogFromDB(id)
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    })
})

export const BlogControllers = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    deleteBlog,
    updateBlog
}