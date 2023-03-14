#!/usr/bin/env bash


set -a
source .config/.env
set +a


ts-node-dev                 \
    --inspect               \
    --project tsconfig.json \
    --respawn               \
    --clear                 \
    Test/App.ts
