import { model, Schema } from "mongoose";

const stationeryProductSchema = new Schema({
    name : {
        type : String,
        required : [true , "Product name is required"]
    },
    brand : {
        type : String,
        required : [true, "Brand name is required"]
    },
    price : {
        type : Number,
        required: [ true, "Product price is required"],
        min: [0, "Price must be a positive number"]
    },
    category : {
        type : String,
        enum : {
            values : ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
            message : '{VALUE} is not a valid category. Allowed categories are: Writing, Office Supplies, Art Supplies, Educational, Technology'
        },
        required: [ true, "Category is required"]
    },
    description : {
        type : String,
        required: [true, "Description is required"]
    },
    quantity : {
        type : Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be a non-negative number"], // Prevent negative stock
    },
    inStock : {
        type : Boolean,
        default : true
    }
})

const StationeryProduct = model("StationeryProducts", stationeryProductSchema)
export default StationeryProduct;