import { TStationeryProduct } from './stationeryProduct.interface';
import StationeryProductModel from './stationeryProduct.model';

// product create
const createProductIntoDB = async (product: TStationeryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// all product get
const getProductFromDB = async (searchTerm : string | undefined ) => {
   const query : Record<string , unknown> = {};
   if(searchTerm){
    Object.assign(query,{
        $or : [
            {name : {$regex : searchTerm , $options : "i"}},
            {brand : {$regex : searchTerm , $options : "i"}},
            {category : {$regex : searchTerm , $options : "i"}},
        ]
    })
   }
   const result = await StationeryProductModel.find(query)
   return result
};


// specif product get
const getSpecifProductFromDB = async (id : string) => {
  const result = await StationeryProductModel.findById(id);
  return result;
};

export const StationeryProductServices = {
  createProductIntoDB,
  getProductFromDB,
  getSpecifProductFromDB
};
