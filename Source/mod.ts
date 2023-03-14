
import { Config , ratedLimited } from './Config'
import { RateLimit } from './RateLimit';
import { furnish } from './API/Document'
import { Core } from './Core'


const EasyBill = {

    use : ( config : Config ) => {

        const core = new Core(config);

        const client = { core };

        return furnish(client)
    },

    usePreset ( ratelimit : RateLimit , config : Config ){
        return this.use({
            ... ratedLimited(ratelimit) ,
            ... config
        })
    }
}


export { EasyBill , Core as Client , Config }

export { RateLimit } from './RateLimit'
