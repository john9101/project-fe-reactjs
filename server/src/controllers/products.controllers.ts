import { Request, Response } from "express";
import productsService from "../services/products.services";
import * as _ from "lodash";

export const pagingProductsController = async (req: Request, res: Response)=>{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = 9
        const skip = (page - 1) * limit;

        const queryProduct: any = {};

        if(req.query.name){
            queryProduct.name = {$regex: req.query.name as string, $options: 'i' }
        }

        if(req.query.sizes){
            const sizeNames = _.split(req.query.sizes as string, ',')
        }

        if(req.query.priceGte || req.query.priceLte){
            if(req.query.priceGte){
                queryProduct.salePrice = {$gte: req.query.priceGte}
            }
            
            if(req.query.priceLte){
                queryProduct.salePrice = {$lte: req.query.priceLte}
            }
        }else if(req.query.priceGte && req.query.priceLte){
            queryProduct.price = {$gte: req.query.priceGte, $lte: req.query.priceLte}
        }

        const products = await productsService.getPagingProducts(queryProduct,skip, limit);
        const total = await productsService.getTotalProducts(queryProduct)

        if(total > 0){
            res.status(200).json({
                products,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            })
        }else{
            res.status(200).json({message: "Không tìm thấy sản phẩm nào liên quan"})
        }
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

export const productDetailController = async (req: Request, res: Response)=>{
    try{
        const product = await productsService.getProductById(req.params.id);
        res.status(200).json(product)
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}


