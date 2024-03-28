#!/bin/bash
set -e
source /home/deploy/.profile
pm2 ls
/usr/bin/sudo /usr/bin/systemctl restart codedeploy-agent.service
/usr/bin/sudo /usr/bin/systemctl status codedeploy-agent.service