
import { DefaultConfig , Config } from './Config'

import Bottleneck from 'bottleneck'



type Request = Omit<InternalRequest,'method'>


interface InternalRequest {

    parameters ?: Record<string,unknown>
    data ?: Record<string,unknown>

    method : string
    path : string
}


const { stringify } = JSON;


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

        const { parameters , method , path , data } = config;
        const { secret , api } = this;


        const token = `Bearer ${ secret }`

        const query = {

            method ,

            headers : {
                'X-Easybill-Escape' : 'true' ,
                'Authorization' : token ,
                'Content-type' : 'application/json' ,
            },

            body : stringify(data)
        }

        const search = parameters as Record<string,string> | undefined;

        const params = new URLSearchParams(search);

        const url = `${ api }/${ path }?${ params.toString() }`


        return this.limit.schedule( async () => {

            const response = await fetch(url,query)

            if( response.body ){

                const data = await
                    response.json();

                return data as Result
            }

            const { status } = response;

            switch ( status ){
            case 204 : throw { success : true }
            case 400 : throw { success : false , cause : 'Invalid Document' }
            case 404 : throw { success : false , cause : 'Not Found' }
            case 429 : throw { success : false , cause : 'Too Many Requests' }

            default :
                throw `Unknown response, status ( ${ status } ) ` +
                      `response ( ${ stringify(response,null,4) } )`
            }
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

