#!/bin/bash

# Create the default ssh folder if it's not already created,
# write the private key into id_rsa and change permissions accordingly

mkdir -p ~/.ssh
echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh

# This fetches the server's public key and makes it a known host to avoid fingerprinting errors
ssh-keyscan -p 22 $IP_ADDRESS >> ~/.ssh/known_hosts

# Add a SSH host to the config file so that it's easier to run SSH commands
cat >> ~/.ssh/config <<CONTENT
Host $1
HostName $IP_ADDRESS
User $SSH_ADMIN_USERNAME
IdentityFile ~/.ssh/id_rsa
CONTENT

