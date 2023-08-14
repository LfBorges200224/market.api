import { IProduct } from "./interfaces";
import market from "./database";
import { NextFunction, Request, Response } from "express";

const  verifyProductExists = (req: Request, res: Response, next: NextFunction): Response | void => {
    const {name} = req.body;
    const product: IProduct | undefined = market.find((product) => product.name === name);

    if(product){
        return res.status(409).json({message: 'Product already registered.'});
    }
    return next();
}

const verifyIdExists = (req: Request, res: Response, next: NextFunction): Response | void => {
    const {id} = req.params;
    const productIndex: number = market.findIndex((product) => product.id === Number(id));

    if(productIndex === -1){
        return res.status(404).json({message: 'Product not found.'});
    }

    res.locals.productIndex = productIndex;
    return next();

}

export { verifyProductExists, verifyIdExists }
