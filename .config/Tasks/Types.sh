

Definitions=https://api.easybill.de/rest/v1/swagger.json


npx openapi-typescript@3.1  \
     $Definitions           \
     --output Source/API/Types.ts
