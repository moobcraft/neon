#!/usr/bin/env bash

# where we'll install the neon service
SERVICE_DIR="/etc/systemd/system"
NEON_DIR="$PWD"


# ARGUMENTS
# -u will set it to execute it as a different user than the current one
# -s will create the service file in a different directory than /etc/systemd/system
# -n will set neons installed directory to something other than current working dir
while getopts 'u:s:n:' flag; do
    case "${flag}" in
        u) USER="${OPTARG}" ;;
        s) SERVICE_DIR="$(realpath ${OPTARG})" ;;
        n) NEON_DIR="$(realpath ${OPTARG})" ;;
        *) exit 1
    esac
done

# check if we're in Neon's directory and complain if we aren't
if ! test -f $NEON_DIR/README.md; then
    echo "did you make sure you cd'd to the right directory?"
    exit 1
fi

# install our dependencies
if command -v npm &> /dev/null
then
    echo "Installing node dependencies"
    npm install > /dev/null
else
    echo "npm not installed!"
    exit 1
fi


# lol im so bad at naming variables
THINGY="\
[Unit]
Description=Neon Discord bot

[Service]
ExecStart=runuser -l $USER -c 'cd $NEON_DIR && npm run start'

[Install]
WantedBy=multi-user.target\
"

# create our service file and make it executable
echo "Creating $SERVICE_DIR/neon.service that will run as user $USER for $NEON_DIR"
sudo sh -c "echo \"$THINGY\" > $SERVICE_DIR/neon.service"
sudo chmod +x $SERVICE_DIR/neon.service

echo "Creating config file"
cp -n $NEON_DIR/defaultconfig.json $NEON_DIR/config.json

echo "Finished installing. Remember to tell systemctl to enable neon, and remember to give the config a token"