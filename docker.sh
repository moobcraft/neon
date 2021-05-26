#!/usr/bin/env bash
deps=(docker docker-compose)
for i in ${deps[@]}
do
	if ! command -v $i &> /dev/null
	then
		echo "$i isn't installed! Please install it with your package manager."
		exit 1
	fi
done
[ -z "$EDITOR" ] && EDITOR=nano

echo "Building Docker image..."
echo "You'll be prompted to paste your Discord token when it's done."
docker-compose build &> /dev/null && echo "Docker container built!"
[ -f ./config.json ] || cp ./defaultconfig.json ./config.json
$EDITOR ./config.json
echo "Done! Run 'docker-compose up -d' to start the bot."
