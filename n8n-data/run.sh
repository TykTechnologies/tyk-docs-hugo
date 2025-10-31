#!/bin/sh
n8n import:credentials --input /data/credentials.json
n8n import:workflow --input /data/workflows.json
n8n execute --id 4mng9TxZXz8NIJvK