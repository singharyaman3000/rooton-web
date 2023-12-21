#!/bin/bash
set -e
source /home/deploy/.profile
cp /home/deploy/codedeploy/fe/.env /home/deploy/codedeploy/fe/v1/
pm2 ls
