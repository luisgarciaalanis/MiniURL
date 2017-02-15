# MiniURL

This shortens URL's, provides short aliases for redirection of long URL's. It has a web service and a UI frontend.

## Setup for local use
1. Install node
2. Install MongoDB
3. Install the following node packages globally (npm install --global):
  * gulp
  * mocha
  * jison
4. Download the sourcecode from git
5. npm install
6. gulp build-ui (optional as the public folder contains the latest build)
7. This app needs permisions to write to /var/log/miniurl/

## Building the parser manually
1. cd lib/urlParser
2. jison urlParserCommon.jison

## Running the code:
* npm start

## Runing the tests:
* mocha tests/tests.js

## Building the docker image and uploading it to dockerhub:
1. build -t &lt;repository&gt;/&lt;image name&gt;:&lt;tag name&gt; .
2. docker login
3. docker push &lt;repository&gt;/&lt;image name&gt;:&lt;tag name&gt;

## To run on a docker container:
* docker run -d --restart=always --env 'MINIURL_DB_CONNECTION_STRING'='&lt;connection string to a running MongoDB database&gt;' -p 80:3000 &lt;repository&gt;/&lt;image name&gt;:&lt;tag name&gt;

