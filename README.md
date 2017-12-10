# ionic-to-phonegap-build
Sends a ZIP package to Phonegap Build

# Installation
npm install -g ionic-to-phonegap-build


## Usage:

### Inside NodeJS applications
You can import this script inside your NodeJS application:

First you need it installed locally:
`npm install ionic-to-phonegap-build --save-dev`

Once you've done this you can use it in code:

```
var ionicToPhonegap = require('ionic-to-phonegap-build');

ionicToPhonegap.sendToPhonegapBuild('Your Phonegap app id', 'Your Phonega auth token', isDebugBoolean[true/false]);

```

ex.

## Parameters

### Phonegap application id
ex '2334553'

### Phonegap application id
ex 'qfqfggFDGSsgdggs'

### Is Debug
ex false

