#!/bin/bash
set -e
source /home/deploy/.profile
rm -rf /home/deploy/codedeploy/fe/v1/*
cp /home/deploy/codedeploy/fe/.env /home/deploy/codedeploy/fe/v1/
pm2 ls
