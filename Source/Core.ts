
import { DefaultConfig , Config } from './Config'

import Bottleneck from 'bottleneck'



type Request = Omit<InternalRequest,'method'>


interface InternalRequest {

    parameters ?: Record<string,unknown>
    data ?: Record<string,unknown>

    method : string
    path : string
}



class Core {

    private readonly secret : string
    private readonly limit : Bottleneck
    private readonly api : string


    constructor ( config : Config ){

        const settings = {
            ... DefaultConfig ,
            ... config
        }


        this.limit = new Bottleneck(settings);

        this.secret = settings.secret;
        this.api = settings.api;
    }


    private request <Result> ( config : InternalRequest ){

        const { method , path } = config;
        const { secret , api } = this;


        const token = `Bearer ${ secret }`

        const query = {

            method ,

            headers : {
                'X-Easybill-Escape' : 'true' ,
                'Authorization' : token ,
                'Content-type' : 'application/json' ,
            }

        }

        const url = `${ api }/${ path }`


        return this.limit.schedule( async () => {

            const response = await fetch(url,query)

            const data = await
                response.json();

            return data as Result
        })
    }


    delete <Result> ( request : Request ){
        return this.request<Result>
            ({ ... request , method : 'DELETE' })
    }

    post <Result> ( request : Request ){
        return this.request<Result>
            ({ ... request , method : 'POST' })
    }

    get <Result> ( request : Request ){
        return this.request<Result>
            ({ ... request , method : 'GET' })
    }

    put <Result> ( request : Request ){
        return this.request<Result>
            ({ ... request , method : 'PUT' })
    }
}



export { Core }
