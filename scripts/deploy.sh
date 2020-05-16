#!/bin/bash

echo 'Removing node_modules directory.';
rm node_modules -dr;

echo 'Installing dependencies.';
npm i --production;

echo 'Deploying to aws.';
sls deploy;

echo 'Re-installing scripts.';
npm i