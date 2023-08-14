import express, {Application, json} from 'express';
import { attProduct, createProduct, deleteProduct, readProducts, readProductsById } from './logicts';
import { verifyIdExists, verifyProductExists } from './middlewares';

const app: Application = express();
app.use(json());

app.post('/products',verifyProductExists, createProduct)

app.get('/products', readProducts)

app.get('/products/:id', verifyIdExists,  readProductsById)

app.patch('/products/:id', verifyProductExists, verifyIdExists, attProduct)

app.delete('/products/:id',  verifyIdExists, deleteProduct)

app.listen(3000, () => {
    console.log('server is running');
});