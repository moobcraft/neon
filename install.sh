#!/usr/bin/env bash

# TODO
# check for more dependencies than just npm, theres also node but im lazy
# offer to install those dependencies if we can't find them on the system
# better error messages than "did you make sure you cd'd to the right directory?"
# maybe prompt for the token and offer to start the systemd service as opposed to a reminder

function _badargs {
    echo "\
Valid options:
    -u USER: run the bot as a different user than the current one
    -s SERVICE_DIR: create the service file in a different directory than /etc/systemd/system
    -n NEON_DIR: set neons installed directory to something other than current working dir
Running without any options is probably what you want to do\
    "
}

# where we'll install the neon service
SERVICE_DIR="/etc/systemd/system"
NEON_DIR="$PWD"

# -n will set neons installed directory to something other than current working dir
while getopts 'u:s:n:' flag; do
    case "${flag}" in
        u) USER="${OPTARG}" ;;
        s) SERVICE_DIR="$(realpath ${OPTARG})" ;;
        n) NEON_DIR="$(realpath ${OPTARG})" ;;
        *) _badargs
           exit 1 ;;
    esac
done

# check if we're in Neon's directory and complain if we aren't
if ! test -f $NEON_DIR/README.md; then
    echo "It doesn't look like we're in Neon's directory!"
    echo "Did you cd to it?"
    exit 1
fi

# install our dependencies
if command -v npm &> /dev/null
then
    echo "Installing node dependencies"
    npm install > /dev/null
else
    echo "Can't install node dependencies because npm isn't installed!"
    exit 1
fi

# lol im so bad at naming variables
THINGY="\
[Unit]
Description=Neon Discord bot
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$NEON_DIR
ExecStart=npm run start

[Install]
WantedBy=multi-user.target\
"

# create our service file and make it executable
echo "Creating $SERVICE_DIR/neon.service that will run as user $USER for $NEON_DIR"
sudo sh -c "echo \"$THINGY\" > $SERVICE_DIR/neon.service"
sudo chmod +x $SERVICE_DIR/neon.service
# create the config file
echo "Creating config file"
cp -n $NEON_DIR/defaultconfig.json $NEON_DIR/config.json
# and we're done!
echo "Finished installing. Remember to tell systemctl to enable neon, and remember to give the config a token"
