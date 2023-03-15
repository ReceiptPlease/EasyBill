
import { furnish as addExtensions } from './Extensions/mod'
import { furnish as addDocuments } from './API/Document'
import { furnish as addWebhook } from './API/Webhook/mod'

import { Core } from './Core'


type Base = { core : Core }

type WithAPI = Base
    & ReturnType<typeof addDocuments>
    & ReturnType<typeof addWebhook>


function furnish ( core : Core ){

    const client =
        addExtensions(
        addDocuments(
        addWebhook(
            { core }
        )))

    return client
}



export type { WithAPI , Base }
export { furnish }

