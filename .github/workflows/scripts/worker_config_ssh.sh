#!/bin/bash

# Create the default ssh folder if it's not already created,
# write the private key into id_rsa and change permissions accordingly

mkdir ~/.ssh
echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh

# This fetches the server's public key and makes it a known host to avoid fingerprinting errors
# TODO: bad approach, see method of caching these values on first run and using them instead
ssh-keyscan -p 22 $IP_ADDRESS >> ~/.ssh/known_hosts

# Add a SSH host to the config file so that it's easier to run SSH commands
cat >> ~/.ssh/config <<CONTENT
Host rcb
HostName $IP_ADDRESS
User ${{ secrets.SSH_ADMIN_USERNAME }}
IdentityFile ~/.ssh/id_rsa
CONTENT

