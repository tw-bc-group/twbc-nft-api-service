#! /bin/sh

set -euo pipefail

if [ "$APP_ENV" == "dev" ]; then
    npm run db:migrate
    exec npm run dev
fi

