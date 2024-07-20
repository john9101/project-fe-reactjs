export interface Voucher {
    _id: string;
    code: string;
    voucherType: string;
    description: string;
    maxValueDiscount: number;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
    usageLimit: number;
    minPriceApply: number;
    status: number;
    createdDate: Date;
    updatedDate: Date;
    userRestrictions: number[];
    usageCount: number;
}
