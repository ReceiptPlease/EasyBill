
import { createWebhook } from './Create'
import { deleteWebhook } from './Delete'
import { findWebhooks } from './All'
import { Core } from '../../Core'


type Client = { core : Core }


function furnish < Type extends Client > ( client : Type ){
    return {

        ... client ,

        createWebhook ,
        deleteWebhook ,
        findWebhooks
    }
}


export { furnish }
