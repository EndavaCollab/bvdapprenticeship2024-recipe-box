#!/bin/bash

# make temp configs directory
ssh rcb "rm -rf ~/deployconfigs/* && mkdir -p ~/deployconfigs/"

# Move the config files to the remote
scp -r ../configs/* rcb:~/deployconfigs/

ssh rcb <<CONTENT
    # Install dependencies if required
    sudo apt -qq update
    sudo apt -qq install nginx -y

    # Remove site files from previous builds
    sudo rm -rf /etc/nginx/sites-enabled/*
    sudo rm -rf /var/www/$GITHUB_FE_SITE_DOMAIN/html/*

    # Create necessary folders and change permissions
    sudo mkdir -p /var/www/$GITHUB_FE_SITE_DOMAIN/html
    sudo chown -R $GITHUB_ADMIN_USERNAME:$GITHUB_ADMIN_USERNAME /var/www/$GITHUB_FE_SITE_DOMAIN/html
    sudo chmod -R 755 /var/www/$GITHUB_FE_SITE_DOMAIN
            
    # Modify nginx script so that the domain is replaced and move it into the corresponding folder
    sed -i "s/REPLACE_DOMAIN/$GITHUB_FE_SITE_DOMAIN/g" ~/deployconfigs/nginx.conf
    sudo mv ~/deployconfigs/nginx.conf /etc/nginx/sites-available/$GITHUB_FE_SITE_DOMAIN

    # Symlink site from available to enabled
    sudo ln -s /etc/nginx/sites-available/$GITHUB_FE_SITE_DOMAIN /etc/nginx/sites-enabled/
CONTENT
