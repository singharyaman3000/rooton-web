#!/bin/bash
set -e
source /home/deploy/.profile
pm2 stop rooton-fe-codedeploy
sudo rm -rf /home/deploy/codedeploy/fe/v1/* /home/deploy/codedeploy/fe/v1/.[!.]* /home/deploy/codedeploy/fe/v1/..?*
sudo cp /home/deploy/codedeploy/fe/.env /home/deploy/codedeploy/fe/v1/
pm2 ls
