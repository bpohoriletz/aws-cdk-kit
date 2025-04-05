#! /bin/sh
test -d /var/app/current &&
  /var/app/current/bin/delayed_job -n 5 stop &&
  /var/app/current/bin/delayed_job stop

exit 0
