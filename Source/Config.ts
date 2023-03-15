
import { RateLimit } from './RateLimit'

import Bottleneck from 'bottleneck'

type Limits = ConstructorParameters<typeof Bottleneck>[0]


type Config = Limits & {

    secret : string
    api ?: string
}


const DefaultConfig = {

    api : 'https://api.easybill.de/rest/v1' ,

    ... ratedLimited(RateLimit.Plus)

}


function ratedLimited ( ratelimit : RateLimit ){
    return <Limits> {
        reservoirRefreshInterval : 60 * 1000 ,
        reservoirRefreshAmount : ratelimit ,
        maxConcurrent : 1 ,
        reservoir : ratelimit ,
        minTime : ( 60 * 1000 ) / ratelimit
    }
}


export { DefaultConfig , ratedLimited , type Config }
