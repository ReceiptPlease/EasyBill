

/**
 *  Requests Per Minute
 */

const RateLimit = {

    Business : 60 ,
    Plus : 10

} as const


type RateLimit =
    ( typeof RateLimit )[ keyof typeof RateLimit ]


export { RateLimit }
