
import { EasyBill , RateLimit } from '../Source/mod'


const { log } = console;

log('Testing EasyBill');


const Secret = process.env.Secret

if( ! Secret )
    throw `Please supply your API secret via the '.config/.env' file with the name 'Secret'`


const config = {
    secret : Secret
}


const client = EasyBill
    .usePreset(RateLimit.Plus,config);


( async () => {

    const documents = await
        client.findDocuments();

    log('Documents:',documents);

})();
