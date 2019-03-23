# Description
A node module to consume the Creative Commons Catalog REST API from NodeJS

[Work in Progress]

# Installation

* Clone the repository locally.
* `cd` into the cloned folder (`cd CC-Search-JS-Client`).
* Run `sudo npm link` (creates a global symlink to this library).
* `cd` into your project and run `npm link cc-client`. (creates a local symlink to global cc-client)

# Usage
```js
const CC = require('cc-client')

const config = {
    name: "test",
    description: "test description",
    email: "test@example.com"
}

const cc = new CC(config);

// Search for tech images in CC Catalog API and returns result in JSON
cc.searchImage("tech", function(err) {console.log("Error: ", err)}, function(result) {
    // Success Callback
    console.log(result)
})
```

Usage Examples: 
```js
const CC = require('cc-client')
const cc = new CC();

function success(result) {
    // do stuff on success
}

function error(err) {
    // fix stuff on error
}

cc.getImageDetails('198eb300-8f6c-44e8-a4b9-45dbf93d3edf', error, success)

cc.resolveLink('zb3k0', error, success)

cc.imageStats(error, success)

cc.readWatermark('198eb300-8f6c-44e8-a4b9-45dbf93d3edf', error, success)

```