export interface Category{
    map(arg0: (category: any) => any): import("react").SetStateAction<string[]>;
    _id?: string;
    name: string;
}