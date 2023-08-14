import { IProduct } from "./interfaces"
import { Request, Response, response } from "express"
import market from "./database"

let newId = 0;

const newDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

const createProduct = (req: Request, res: Response): Response => {
    newId++;
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + 365);
    const newProduct: IProduct ={
        id: newId,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        section: req.body.section,
        calories: req.body.calories,
        expirationDate: newDate(expirationDate)
    }

    market.push(newProduct);

    return res.status(201).json(newProduct);
}

const readProducts = (req: Request, res: Response): Response => {
    const obj = {
        total: market.reduce((acc, product) => acc + product.price, 0),
        products: market
    }
    return res.status(200).json(obj);
}

const readProductsById = (req: Request, res: Response): Response => {
    const index = res.locals.productIndex;
    return res.status(200).json(market[index]);
}

const attProduct = (req: Request, res: Response): Response => {
    const index  = res.locals.productIndex;

    const newProduct: IProduct = {
        ...market[index],
        ...req.body
    } 

    market[index] = newProduct;
    return res.status(200).json(newProduct);
}



const deleteProduct = (req: Request, res: Response)=> {
    const  id  = res.locals.productIndex;
    
    market.splice(id, 1);

    return res.status(204).send();
}

export { createProduct, readProducts, attProduct, deleteProduct, readProductsById }
