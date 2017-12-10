# ionic-to-phonegap-build
Sends a ZIP package to Phonegap Build

# Installation
npm install -g ionic-to-phonegap-build


## Usage:

You can import this script inside your NodeJS application:

First you need it installed locally:
`npm install ionic-to-phonegap-build --save-dev`

Once you've done this you can use it in code:

```
var ionicToPhonegap = require('ionic-to-phonegap-build');

ionicToPhonegap.sendToPhonegapBuild('Your Phonegap app id', 'Your Phonega auth token', isDebugBoolean[true/false]);

```

## Parameters

### Phonegap application id
ex '2334553'

### Phonegap application id
ex 'qfqfggFDGSsgdggs'

### Is Debug
ex false

## Execute with npm scripts


### Create js file

Create a phbuild.js file with following contents:

```

var ionicToPhonegap = require('ionic-to-phonegap-build');
ionicToPhonegap.sendToPhonegapBuild('2922066', 'D9eKg6fdggjuxjskEbGm4KZy', true);

```

### Add script in package.json
in your package.json add following script in the scripts section:

```

scripts: {
"phbuild": "node phbuild.js"
  },

```

### Run it
Now you can run it manually:

```

npm run phbuild

```