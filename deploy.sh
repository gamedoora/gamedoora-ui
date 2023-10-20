# Stop the service build and start the service
sshpass -p $SSH_PASS ssh -o StrictHostKeyChecking=no "$SSH_USERNAME@$SSH_HOST" 'systemctl stop pm2-gamedoora; cd /home/gamedoora/UI; sh build.sh; chown -R gamedoora:gamedoora /home/gamedoora/UI; systemctl start pm2-gamedoora'
