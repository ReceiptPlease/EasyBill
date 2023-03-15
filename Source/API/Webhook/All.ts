
import { definitions , paths } from '../Definititons'
import { Core } from '../../Core'


type Parameters = paths[ '/webhooks' ][ 'get' ][ 'parameters' ][ 'query' ]
type Webhooks = definitions[ 'WebHooks' ]

type Client = { core : Core }


const DefaultParameters = {
    limit : 10 ,
    page : 1
}


async function findWebhooks ( this : Client , parameters : Parameters = DefaultParameters ){
    return this.core.get<Webhooks>
        ({ parameters , path : 'webhooks' })
}



export { findWebhooks }
