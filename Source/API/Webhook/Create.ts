
import { definitions , paths } from '../Definititons'
import { Core } from '../../Core'


type Webhook = definitions[ 'WebHook' ]

type Data = paths[ '/webhooks' ][ 'post' ][ 'parameters' ][ 'body' ][ 'body' ]

type Client = { core : Core }



async function createWebhook ( this : Client , data : Data ){
    return this.core.post<Webhook>
        ({ data , path : 'webhooks' })
}



export { createWebhook }
