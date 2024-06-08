import { Product,IOption } from '../models/model'
class ProductService{
    async getTotalProducts(queryProduct: any){
        return await Product.countDocuments(queryProduct)
    }

    async getPagingProducts(queryProduct: any,skip: number, limit: number){
        const products = await Product.find({... queryProduct, options: {$exists: true, $not: {$size: 0}}})
            .lean().populate("options category").select("-shortDescription -longDescription").skip(skip).limit(limit)

        return products.map(product => {
            return {
              ... product,
              options: (product.options as IOption[]).map(option => ({
                ... option,
                stocks: option.stocks.map(stock => ({
                  size: stock.size
                }))
              }))
            };
        });
    }

    async getProductById(productId: string){
        const product = await Product.findById(productId).populate("options category")
        return product
    }
}

const productsService = new ProductService()
export default productsService