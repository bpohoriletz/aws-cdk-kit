mkdir -p /etc/ssl/private /etc/ssl/certs &&
openssl req -newkey rsa:2048 -nodes -keyout /etc/ssl/private/haproxy.key -x509 -out /etc/ssl/certs/haproxy.crt -subj "/CN=*.compute-1.amazonaws.com" &&
cat /etc/ssl/certs/haproxy.crt /etc/ssl/private/haproxy.key > /etc/ssl/certs/haproxy.pem

