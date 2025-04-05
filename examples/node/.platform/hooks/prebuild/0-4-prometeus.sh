#! /bin/sh
set -e

NODE_EXPORTER_VERSION="1.9.0"
NODE_EXPORTER_BIN="/usr/local/bin/node_exporter"
NODE_EXPORTER_USER="node_exporter"
NODE_EXPORTER_SERVICE="/etc/systemd/system/node_exporter.service"
DOWNLOAD_URL="https://github.com/prometheus/node_exporter/releases/download/v$NODE_EXPORTER_VERSION/node_exporter-$NODE_EXPORTER_VERSION.linux-amd64.tar.gz"

if command -v node_exporter >/dev/null 2>&1; then
    echo "Node Exporter is already installed."
else
    echo "Node Exporter is not installed. Installing now..."

    wget $DOWNLOAD_URL -O /tmp/node_exporter.tar.gz
    tar xvf /tmp/node_exporter.tar.gz -C /tmp/

    sudo mv /tmp/node_exporter-$NODE_EXPORTER_VERSION.linux-amd64/node_exporter $NODE_EXPORTER_BIN
    rm -rf /tmp/node_exporter-$NODE_EXPORTER_VERSION.linux-amd64
    rm /tmp/node_exporter.tar.gz

    sudo useradd -r -s /bin/false $NODE_EXPORTER_USER
    sudo chown $NODE_EXPORTER_USER:$NODE_EXPORTER_USER $NODE_EXPORTER_BIN

    sudo tee $NODE_EXPORTER_SERVICE <<EOF
[Unit]
Description=Prometheus Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=$NODE_EXPORTER_USER
Group=$NODE_EXPORTER_USER
ExecStart=$NODE_EXPORTER_BIN

Restart=always

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable node_exporter
    sudo systemctl start node_exporter

    echo "Node Exporter has been installed and started as a service."
fi

sudo systemctl status node_exporter
