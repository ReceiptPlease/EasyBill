
import { definitions , paths } from './Types'
import { Core } from '../Core'


type DocumentProps = paths[ '/documents' ][ 'get' ][ 'parameters' ][ 'query' ]

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

    return this.core.get
        <Document>({ path });
}

// async function createDocument ( this : Client ){

// }

// async function updateDocument ( this : Client ){

// }

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
        // updateDocument ,
        // deleteDocument ,
        // cancelDocument ,
        findDocuments,
        findDocument ,
        // sendDocument ,
        // toPDF
    }
}


export { furnish }
