lsblk           # xvdb      202:16   0   5G  0 disk
sudo mkdir /mnt/postgresql
sudo mkfs -t ext4 /dev/xvdb
sudo mount /dev/xvdb /mnt/postgresql
sudo chown -R postgres:postgres /mnt/postgresql
lsblk           # xvdb      202:16   0   5G  0 disk /mnt/postgresql
