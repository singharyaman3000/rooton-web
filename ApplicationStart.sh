#!/bin/bash
source /home/deploy/.profile
cd /home/deploy/codedeploy/fe/v1/
pm2 delete rooton-fe-codedeploy
pm2 start npm --name "rooton-fe-codedeploy" -- start
