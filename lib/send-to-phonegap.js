"use strict"

const copyfiles = require('copyfiles');
const del = require('delete');
const moment = require('moment');
const pgBuild = require('phonegap-build-api');
const colors = require('colors');
const archiver = require('archiver');
const fs = require('fs');

exports.sendToPhonegapBuild = function sendToPhonegapBuild(phonegapAppId, phonegapAuthToken, isDebug) {

    var config = {
        folder: "phonegap_build",
        appId: '',
        authToken: '',
        isDebug: true,
        keys: {
            dev: { ios: 1, android: 1 },
            prod: { ios: 2, android: 2 }
        }
    }


    config.appId = phonegapAppId;
    config.authToken = phonegapAuthToken;
    config.isDebug = isDebug;

    var copyFiles = function () {
        console.log("Cleaning up folder...".gray)
        del.sync([config.folder]);

        console.log("Copying files for package...".gray);
        copyfiles(['www/**', `${config.folder}/package`], '', copyPackageFiles);

    }

    var copyPackageFiles = function () {
        console.log("Copying config.xml...".gray)
        copyfiles(['config.xml', `${config.folder}/package/www`], '', zipFiles);
    }

    var zipFiles = function () {

        var timestamp = moment().format('YYYYMMDDhhmmss');
        var archiveName = `Package_${timestamp}.zip`;

        console.log("Zipping the package...".gray)

        createZip(archiveName).then(() => {
            sendBuildFiles(archiveName);
        })

    }

    var sendBuildFiles = function (archiveName) {

        console.log(`Sending ${archiveName} to Phonegap Build...`.gray)
        var endpoint = `/apps/${config.appId}`;

        pgBuild.auth({ token: config.authToken }, function (e, api) {

            var options = {
                form: {
                    data: {
                        debug: config.isDebug,
                        //keys: phoneGap.keys[phoneGap.env]
                    },
                    file: config.folder + '/' + archiveName
                }
            };
            api.put(endpoint, options, finished);

        });
    }

    var finished = function (e, a) {
        if (e !== null) {
            console.log("Error sending to Phonegap build".red.bold.underline);
            console.log(e);
        } else {
            console.log("Last build sent to Phonegap".green.bold.underline);
            console.log(`Build count: ${a.build_count}`.green);
            console.log(`Phonegap version: ${a.phonegap_version}`.green);
            console.log(`${a.title} version: ${a.version}`.green);
        }

    };

    function createZip(archiveName) {
        return new Promise((resolve, reject) => {
            const filePath = config.folder + '/' + archiveName;

            console.log('Creating zip file...'.gray)
            const archive = archiver('zip')
            const output = fs.createWriteStream(filePath)

            output.on('close', () => {
                resolve(filePath)
            })

            archive.on('error', err => reject(err))
            archive.pipe(output);
            archive.directory(config.folder + '/package/www', false);
            archive.finalize();
        });
    }

    copyFiles();


}




