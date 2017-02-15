#!/bin/bash

if ! [ $MINIURL_DB_CONNECTION_STRING ] ; then
	echo "MINIURL_DB_CONNECTION_STRING not set!";
	echo "Please set the variable to the mongodb connection string";
	exit 1;
fi 

if [ -z "$1" ] ; then
	echo "Please pass the tag id as first parameter of this script";
	echo "deploy.sh <id>";
	exit 1;
fi

if [ $1 = "--help" ]; then
	echo "This script is used to launch MiniURL to a docker machine";
	echo "";
	echo "Usage:";
	echo "";
	echo "  deploy.sh <comand>";
	exit 0;
fi

if [ $(docker ps -q) ]; then docker stop $(docker ps -q); fi
if [ $(docker ps -a -q) ]; then docker rm $(docker ps -a -q); fi
#sleep 3

docker run -d --restart=always --name=miniurl --env 'MINIURL_DB_CONNECTION_STRING'=$MINIURL_DB_CONNECTION_STRING -p 80:3000 luisgarciaalanis/miniurl:$1 

