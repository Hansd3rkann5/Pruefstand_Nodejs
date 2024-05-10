sudo cp ./haha.service /etc/systemd/system
systemctl daemon-reload
systemctl enable haha.service
systemctl start haha.service
systemctl status haha.service