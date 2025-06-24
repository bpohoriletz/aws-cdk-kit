curl -LO https://github.com/haproxytech/dataplaneapi/releases/latest/download/dataplaneapi_3.2.1_linux_amd64.rpm
sudo dnf install -y ./dataplaneapi_3.2.1_linux_amd64.rpm

sudo systemctl start dataplaneapi
curl -X GET --user admin:adminpwd http://localhost:5555/v3/info
