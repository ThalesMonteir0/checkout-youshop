import { rest } from 'msw'
import { Products } from './mockProducts';

export const handlers = [
    rest.get('https://api.deepspacestore.com/offers/:OFFER_CODE', (req,res,ctx) => {
        console.log(req.params);
        const { id } = req.params;
        let productResponse = {}
        let ok = false

        for(product of Products){
            if(product.id === id){
                productResponse =  product
                ok = true
                break
            }
        }

        if (!ok) {
            return res(ctx.status(404))
        }

        return res(ctx.status(200), ctx.json(productResponse))
    })
]