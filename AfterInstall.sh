#!/bin/bash
set -e
source /home/deploy/.profile
/usr/bin/sudo /bin/chown -R deploy.deploy /home/deploy/codedeploy/fe/v1/
cd /home/deploy/codedeploy/fe/v1/
rm -rf node_modules
npm install
