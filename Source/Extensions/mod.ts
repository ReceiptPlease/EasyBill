
import { deleteWebhooks } from './Delete'
import { WithAPI } from '../Client'


function furnish ( client : WithAPI ){
    return {

        ... client ,

        deleteWebhooks
    }
}



export { furnish }
