#!/bin/bash

# Fetches the public IP for the RCB VM and logs the error into ./ip_fetch_error.log
cmd_output=$(az network public-ip show \
    --resource-group apprenticeship-2024-rg \
    --name $1 \
    --query "ipAddress" \
    --output tsv 2> ./ip_fetch_error.log) || \
{ \
    # If there is an error show it and crash.
    echo "Fetching IP Address failed! Please check the error."; \
    cat ./ip_fetch_error.log; \
    exit 1; \
} \

# Sometimes the command can return nothing, in that case the query is most probably wrong
if [ -z "$cmd_output" ]; then
    echo "Fetching IP Address failed! Please check that the infrastructure was deployed and the query is correct."
    exit 1
else
    # If everything runs smoothly IP_ADDRESS is added to the GH environment
    echo "IP_ADDRESS=$cmd_output" > $GITHUB_ENV
    echo "Successfully fetched IP address into IP_ADDRESS"
fi
