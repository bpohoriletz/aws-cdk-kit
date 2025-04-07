sudo dnf install -y redis6
sudo vi /etc/redis6/redis6.conf # comment out bind and set protected-mode = no
sudo systemctl start redis6
sudo systemctl enable redis6
sudo systemctl status redis6

