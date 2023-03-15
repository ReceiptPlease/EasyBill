
import { Core } from '../../Core'

type Client = { core : Core }


type Cause = 'Too Many Requests' | 'Not Found'

type Response = {
    success : true
} | {
    success : false
    cause : Cause
}


async function deleteWebhook ( this : Client , webhookId : number ){

    const path = `webhooks/${ webhookId }`

    return this.core
        .delete<never>({ path })
        .catch<Response>(( error : any ) => {

            if( Object.hasOwn(error,'success') )
                return error

            throw error
        })
}



export { deleteWebhook }
