
<div align = center >

# EasyBill <br> Wrapper

An unofficial API wrapper  
of the EasyBill service.

<br>
<br>

```sh
npm install easybill
```

</div>

<br>
<br>

## Example

```TypeScript
import { EasyBill } from 'easybill'

const Secret = process.env.Secret;

const config = {
    secret : Secret
}

const client = EasyBill
    .use(config);

const documents = await 
    client.findDocuments();
```

<br>
<br>

## Development

Install the development dependencies.

```sh
npm install
```

<br>

Start the  `ts-node-dev`  instance.

```sh
npm run dev
```

<br>

To regenerate / update the API types.

```sh
npm run generate:types
```

<br>
