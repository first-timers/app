#!/bin/sh

now="npx now --debug --token=$NOW_TOKEN"

echo "$now rm --safe --yes first-timers-bot"
$now rm --safe --yes first-timers-bot

echo "$now --public"
$now --public

echo "$now alias"
$now alias
