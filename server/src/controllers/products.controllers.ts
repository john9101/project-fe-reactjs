import { Request, Response } from "express";
import productsService from "../services/products.services";
import * as _ from "lodash";
import {gt} from "lodash";

export const getPagingProductsController = async (req: Request, res: Response)=>{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = 9
        const skip = (page - 1) * limit;

        const queryProduct: any = {};

        if(req.query.name){
            queryProduct.name = {$regex: req.query.name as string, $options: 'i' }
        }

        if(req.query.priceRanges || req.query.ratings || req.query.uniformGenders){
            queryProduct.$and = []
            if(req.query.priceRanges){
                const priceRanges = _.split(req.query.priceRanges as string, ',');
                const priceRangesFilter = {
                    $or: priceRanges.map(priceRange => {
                        if(priceRange === 'under100000'){
                            return {$expr: { $lt: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 100000]}}
                        }else if(priceRange === 'from100000To200000'){
                            return {
                                $and: [
                                    {$expr: { $gte: [{ $multiply: [{$multiply: [{$subtract: [1,'$discountPercent']},100]}, '$originalPrice'] }, 100000]}},
                                    {$expr: { $lte: [{ $multiply: [{$multiply: [{$subtract: [1,'$discountPercent']},100]}, '$originalPrice'] }, 200000]}}
                                ]
                            }
                        }else if(priceRange === 'from200000To350000'){
                            return {
                                $and: [
                                    {$expr: { $gte: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 200000]}},
                                    {$expr: { $lte: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 350000]}}
                                ]
                            }
                        }else if(priceRange === 'from350000To500000'){
                            return {
                                $and: [
                                    {$expr: { $gte: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 350000]}},
                                    {$expr: { $lte: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 500000]}}
                                ]
                            }
                        }else if(priceRange === 'from500000To700000'){
                            return {
                                $and: [
                                    {$expr: { $gte: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 500000]}},
                                    {$expr: { $lte: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 700000]}}
                                ]
                            }
                        }else if(priceRange === 'over700000'){
                            return {$expr: { $gt: [{ $multiply: [{$subtract: [1,'$discountPercent']}, '$originalPrice'] }, 700000]}}
                        }else{
                            return {}
                        }
                    })
                }
                queryProduct.$and.push(priceRangesFilter);
            }

            if (req.query.ratings){
                const ratings = _.split(req.query.ratings as string, ',');
                console.log(ratings)
                const ratingsFilter = {
                    $or: ratings.map(rating => {
                        if(rating === '5'){
                            return {rating: 5}
                        } else{
                            return {rating: {$gte: parseInt(rating)}};
                        }
                    })
                }
                queryProduct.$and.push(ratingsFilter)
            }

            if(req.query.uniformGenders){
                const uniformGenders = _.split(req.query.uniformGenders as string, ',');
                const uniformGendersFilter = {uniformGender: {$in: uniformGenders}};
                queryProduct.$and.push(uniformGendersFilter)
            }
        }

        const products = await productsService.getPagingProducts(queryProduct,skip,limit);
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

export const getProductDetailController = async (req: Request, res: Response)=>{
    try{
        const product = await productsService.getProductById(req.params.id);
        res.status(200).json(product)
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}


