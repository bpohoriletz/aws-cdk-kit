iptables -L INPUT -n --line-numbers &&
  iptables -D INPUT 5 &&
  iptables -A INPUT -p tcp --dport 80 -j ACCEPT &&
  iptables -A INPUT -p tcp --dport 443 -j ACCEPT &&
  iptables -A INPUT -j REJECT --reject-with icmp-host-prohibited &&
  service iptables save &&
  iptables -L INPUT -n --line-numbers
