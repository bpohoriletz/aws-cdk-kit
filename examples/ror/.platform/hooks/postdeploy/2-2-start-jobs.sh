#! /bin/sh
RAILS_ENV=production bin/delayed_job --pool=attachments:2 --pool=*:3 start
