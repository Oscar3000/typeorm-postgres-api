#!/bin/bash

set -e
run_cmd="yarn start"

until psql do
>&2 echo "Waiting for PostgreSQL..."
sleep 1
done

>&2 echo "PostgreSQL is up - executing command"
exec $run_cmd