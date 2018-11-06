/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 // get required modules for speech to text
var extend = require('extend');
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var request = require('request');

// load in the environment data for our application
var config = require('../../env.json');

/**
 * this returns a speech to text token to be used in the browser for direct access
 * to the Watson speech to text service. 
 * @param {NodeJS Request Object} req - provides information about the inbound request
 * @param {NodeJS Response Object} res - this is how we respond back to the browser
 */
exports.stt_token = function(req, res) {
    var methodName = 'stt_token';
    // The following three lines translate the curl request provided by IBM into a nodeJS request format so that the token can be retrieved by your server code. 
    var form = { grant_type: 'urn:ibm:params:oauth:grant-type:apikey', apikey: config.speech_to_text.apikey }
    var headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' };
    var options = { url: 'https://iam.bluemix.net/identity/token', method: 'POST', form: form, headers: headers };
    
    // get the new token
    request(options, function (error, response, body) 
    {
        if (!error && response.statusCode == 200) 
        // send the token back as the 'success' item in the returned json object
        { res.send({success: JSON.parse(body).access_token}); }
        else 
        // send the failure message back as the 'failed' item in the returned json object.
        { console.log(methodName+' error: ', error); res.send({failed: error.message}) }
    });
}
