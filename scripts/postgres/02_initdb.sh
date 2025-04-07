sudo su - postgres
cd /mnt/postgresql
mkdir 16
chmod 700 /mnt/postgresql/16
initdb -D /mnt/postgresql/16

exit
sudo vi /lib/systemd/system/postgresql.service # Environment=PGDATA=/mnt/postgresql/16
sudo vi /mnt/postgresql/16/pg_hba.conf         # host    all             all             10.0.64.0/19            md5
sudo vi /mnt/postgresql/16/postgresql.conf     # listen_addresses = '*'
sudo systemctl daemon-reload
sudo systemctl enable postgresql
sudo systemctl start postgresql
sudo systemctl status postgresql
