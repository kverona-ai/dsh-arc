#!/bin/sh
# Revive contract: start the app if the preview port is down.
set -eu
ROOT="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
cd "$ROOT"
npm run dev > /tmp/dsh-brickbook-dev.log 2>&1 &
exit 0
