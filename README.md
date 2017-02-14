# MiniURL
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

## Building the parser manually
1. cd lib/urlParser
2. jison urlParserCommon.jison

## Running the code:
* npm start

## Runing the tests:
* mocha tests/tests.js

## Building the docker image and uploading it:
1. build -t &lt;repository&gt;/&lt;image name&gt;:&lt;tag name&gt; .
2. docker login
3. docker push &lt;repository&gt;/&lt;image name&gt;:&lt;tag name&gt;
