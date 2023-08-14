interface IProduct {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: string;
    calories?: number | null | undefined;
    expirationDate?: string;
}

type IProductNew = Omit<IProduct , 'id' | 'experiation'>;

export { IProduct, IProductNew};