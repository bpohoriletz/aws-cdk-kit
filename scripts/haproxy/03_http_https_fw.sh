sudo iptables -L INPUT -n --line-numbers
sudo iptables -D INPUT 5
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -j REJECT --reject-with icmp-host-prohibited
sudo service iptables save
