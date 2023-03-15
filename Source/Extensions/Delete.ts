
import { WithAPI } from '../Client'


async function deleteWebhooks ( this : WithAPI ){

    let { items } = await
        this.findWebhooks();

    items ??= [];


    const errors = [];

    for ( const webhook of items ){

        const { id } = webhook;

        const result = await this
            .deleteWebhook(id!)

        if( result.success )
            continue

        errors.push({
            webhookId : id! ,
            cause : result.cause
        })
    }


    const failed = errors.length;

    const removed = items.length - failed;

    return { removed , failed , errors }
}



export { deleteWebhooks }
