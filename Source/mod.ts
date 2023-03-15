
import { Config , ratedLimited } from './Config'
import { RateLimit } from './RateLimit';
import { furnish } from './Client'
import { Core } from './Core'


const EasyBill = {

    /**
     *  Create a client instance with a custom config
     */

    use : ( config : Config ) =>
        furnish(new Core(config)) ,


    /**
     *  Create a client with a preset limiter
     */

    usePreset ( ratelimit : RateLimit , config : Config ){
        return this.use({
            ... ratedLimited(ratelimit) ,
            ... config
        })
    }
}


export { EasyBill , Core }

export { RateLimit } from './RateLimit'
export type { Config } from './Config'

export * from './API/Types'
