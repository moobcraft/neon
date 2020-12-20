#!/usr/bin/env bash

# This file is very specific to my own use case, dont expect it to work
# on your own machine unless you somehow bodged your own bedrock server
# together in exactly the same way that i did lmfao

# this file works with ./commands/whitelist.js... somehow

screen -Rd moobcraft -X stuff "whitelist add $1$(printf '\r')"
