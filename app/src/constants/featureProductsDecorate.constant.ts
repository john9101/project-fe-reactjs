interface FeatureProductsDecorateType{
    [key: string]: {
        clientName: string,
        serverName: string,
        bgColor:  'orange' | 'green' | 'red',
        destBreadcrumb: string
        path: string
        params : URLSearchParams
    }
}

export const FeatureProductsDecorateConstant: FeatureProductsDecorateType = {
    saleOff: {
        clientName: 'sale-off',
        serverName: 'saleOff',
        bgColor: 'orange',
        destBreadcrumb: 'Đồng phục đang giảm giá',
        path: '/feature/sale-off',
        params: new URLSearchParams({"sort": 'asc', "saleOff" : String(true)}),
    },
    newArrive: {
        clientName: 'new-arrive',
        serverName: 'newArrive',
        bgColor: 'green',
        destBreadcrumb: 'Đồng phục mới ra mắt',
        path: '/feature/new-arrive',
        params: new URLSearchParams({"sort": 'asc', "newArrive" : String(true)}),
    },
    popular: {
        clientName: 'popular',
        serverName: 'popular',
        bgColor: 'red',
        destBreadcrumb: 'Đồng phục phổ biến',
        path: '/feature/popular',
        params: new URLSearchParams({"sort": 'asc', "popular" : String(true)}),
    },
}