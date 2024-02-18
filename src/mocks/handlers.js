import { http, HttpResponse } from 'msw'
import { Products } from './mockProducts';

export const handlers = [

    http.get('/offers/:id', ({params}) => {
        const { id } = params
        const idNumber = Number(id)
        let productResponse = {}
        let ok = false

        for(let product of Products){
            if(product.id === idNumber){
                productResponse =  product
                ok = true
                break
            }
        }

        if (!ok) {
            return HttpResponse.json(null, { status: 404 })
        }
      
        return HttpResponse.json(productResponse, { status: 200 })
    }),

    http.post('/offers/:id/create_order', async ({request}) => {
        const newOrder = await request.json()
        console.log(newOrder);
        if(newOrder.cpf === "000.000.000-00"){
            return HttpResponse.json({err: 'CPF invalido!'},{status: 400})
        }

        newOrder.code = Math.floor(Math.random() * 1000)

        return HttpResponse.json(newOrder, {status: 201})
    })
]