import {Product, IOption, IProduct} from '../models/model'
class ProductService{
    async getTotalProducts(queryProduct: any){
        return await Product.countDocuments(queryProduct)
    }

    async getPagingProducts(queryProduct: any,skip: number, limit: number, sort: string){
        // const products = await Product.find({... queryProduct, options: {$exists: true, $not: {$size: 0}}})
        //     .lean().populate("options category").select("-shortDescription -longDescription").skip(skip).limit(limit)
        //
        // return products.map(product => {
        //     return {
        //       ... product,
        //       options: (product.options as IOption[]).map(option => ({
        //         ... option,
        //         stocks: option.stocks.map(stock => ({
        //           size: stock.size
        //         }))
        //       }))
        //     };
        // });

        const products = await Product.find(queryProduct).lean().populate("options category").select('-longDescription').skip(skip).limit(limit).exec()
        return products.sort((productFirst,productSecond)=>{
            const uniformPriceFirst = productFirst.originalPrice * (1 - productFirst.discountPercent);
            const uniformPriceSecond = productSecond.originalPrice * (1 - productSecond.discountPercent);
            if (sort === 'asc'){
                return uniformPriceFirst - uniformPriceSecond
            }else if(sort === 'desc'){
                return uniformPriceSecond - uniformPriceFirst
            }else {
                return 0
            }
        })
    }


    async getProductById(productId: string){
        const product = await Product.findById(productId).populate("options category").populate({
            path: "sizeCharts",
            populate: {
                path: "initialUniformSpecs.measurement"
            }
        })
        return product
    }
}

const productsService = new ProductService()
export default productsService