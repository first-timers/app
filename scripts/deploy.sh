#!/bin/sh

now="npx now --debug --token=$NOW_TOKEN"

echo "$ now rm --safe --yes first-timers-bot"
$now rm --safe --yes first-timers-bot

echo "$ now --public --no-verify"
$now --public --no-verify

echo "$ now alias --no-verify"
$now alias --no-verify
