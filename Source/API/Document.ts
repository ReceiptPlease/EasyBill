
import { definitions , paths } from './Definititons'
import { Core } from '../Core'


type DocumentProps = paths[ '/documents' ][ 'get' ][ 'parameters' ][ 'query' ]
type DocumentUpdate = paths[ '/documents/{id}' ][ 'put' ][ 'parameters' ][ 'body' ][ 'body' ]

type Documents = definitions[ 'Documents' ]
type Document = definitions[ 'Document' ]


type Client = { core : Core }


const DefaultDocumentProps = {
    limit : 10 ,
    page : 1
}


async function findDocuments ( this : Client , parameters : DocumentProps = DefaultDocumentProps ){
    return this.core.get<Documents>
        ({ parameters , path : 'documents' })
}

async function findDocument ( this : Client , documentId : number ){

    const path = `documents/${ documentId }`

    return this.core
        .get<Document>({ path })

}

// async function createDocument ( this : Client ){

// }

type Cause = 'Invalid Document' | 'Not Found'

type Response = {
    success : true
} | {
    success : false
    cause : Cause
}

async function updateDocument ( this : Client , documentId : number , data : DocumentUpdate ){

    const path = `documents/${ documentId }`

    return this.core
        .put<never>({ path , data })
        .catch<Response>(( error : any ) => {

            if( Object.hasOwn(error,'success') )
                return error

            throw error
        })
}

// async function deleteDocument ( this : Client ){

// }

// async function completeDocument ( this : Client ){

// }


// async function cancelDocument ( this : Client ){

// }


// async function sendDocument ( this : Client ){

// }

// async function toPDF ( this : Client ){

// }


function furnish < Type extends Client > ( client : Type ){
    return {

        ... client ,

        // completeDocument ,
        // createDocument ,
        updateDocument ,
        // deleteDocument ,
        // cancelDocument ,
        findDocuments,
        findDocument ,
        // sendDocument ,
        // toPDF
    }
}


export { furnish }
