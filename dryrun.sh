#! /bin/sh
wait-for-it postgres:5432 -t 60

NODE_ENV=production npm run dry-run
