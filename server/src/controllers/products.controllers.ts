import { Request, Response } from "express";
import productsService from "../services/products.services";
import * as _ from "lodash";
import {subDays} from 'date-fns'
import mongoose from "mongoose";

export const getPagingProductsController = async (req: Request, res: Response)=>{
    try{
        let page = req.query.page ? parseInt(req.query.page as string) : 1;
        if(page > 0){
            const limit = 9
            const skip = (page - 1) * limit;

            const queryProduct: any = {};

            if(req.query.name || req.query.keyword){
                queryProduct.name = {$regex: req.query.name || req.query.keyword as string, $options: 'i' }
            }

            if(req.query.priceRanges || req.query.ratings || req.query.uniformGenders || req.query.categories){
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
                    let ratingCondition: number | {$gte: number} = 0;
                    const ratingsFilter = {
                        $or: ratings.map(rating => {
                            if(rating === 'eq5'){
                                ratingCondition = 5
                            } else{
                                if(rating === 'gte4'){
                                    ratingCondition = {$gte: 4}
                                }else if(rating === 'gte3'){
                                    ratingCondition = {$gte: 3}
                                }else if (rating === 'gte2'){
                                    ratingCondition = {$gte: 2}
                                }else if(rating === 'gte1'){
                                    ratingCondition = {$gte: 1}
                                }
                            }
                            return {rating: ratingCondition};
                        })
                    }
                    queryProduct.$and.push(ratingsFilter)
                }

                if (req.query.categories){
                    const categories = _.split(req.query.categories as string, ',');
                    const validCategories = categories.filter(category => mongoose.Types.ObjectId.isValid(category))
                    const categoriesFilter = {category: {$in: validCategories}};
                    queryProduct.$and.push(categoriesFilter)
                }

                if(req.query.uniformGenders){
                    const uniformGenders = _.split(req.query.uniformGenders as string, ',');
                    const uniformGendersFilter = {uniformGender: {$in: uniformGenders}};
                    queryProduct.$and.push(uniformGendersFilter)
                }
            }

            if (Boolean(req.query.saleOff) === true){
                queryProduct.discountPercent = {$gt: 0}
            }

            if (Boolean(req.query.newArrive) === true){
                const thirtyDaysAgo = subDays(new Date(), 30)
                queryProduct.createdAt = {$gte: thirtyDaysAgo}

            }

            if (Boolean(req.query.popular) === true){
                queryProduct.views = {$gte: 300}
            }

            const products = await productsService.getPagingProducts(queryProduct,skip,limit, req.query.sort as string);
            const total = await productsService.getTotalProducts(queryProduct)

            if(products.length){
                res.status(200).json({
                    products,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                })
            }else {
                res.status(200).json({message: "Không tìm thấy đồng phục nào liên quan"})
            }
        }else{
            res.status(200).json({message: "Không tìm thấy đồng phục nào liên quan"})
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


