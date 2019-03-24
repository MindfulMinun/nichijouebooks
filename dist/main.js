'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // path/fs: To fetch the interstitials
// Twit: the library for connecting to Twitter
// Markov: the Markov chain text generator
// SelamatPagi: the dictionary with all the Nichijou quotes
// that Markov will generate from.


var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

var _markovStrings = require('markov-strings');

var _markovStrings2 = _interopRequireDefault(_markovStrings);

var _NichijouDict = require('./NichijouDict.js');

var _NichijouDict2 = _interopRequireDefault(_NichijouDict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var production = /production/i.test(process.env.NODE_ENV || '');
require('dotenv').config();

var args = process.argv.slice(2);

// Crow: The Twit client instance
// Reference to the talking crow in Nichijou E17
var Crow = new _twit2.default({
    consumer_key: process.env.C_KEY,
    consumer_secret: process.env.C_SECRET,
    access_token: process.env.A_TOKEN,
    access_token_secret: process.env.A_SECRET,
    timeout_ms: 30 * 1000,
    strictSSL: true
});

if (args.some(function (v) {
    return ['-i', '--interstitial', '--interstitials'].includes(v);
})) {
    // Make an interstitial!
    // Import the interstitials data
    var data = require(_path2.default.resolve(__dirname, '../interstitials/info.json'));

    // Choose an image, get its alt text data

    var _chooseObject = chooseObject(data),
        _chooseObject2 = _slicedToArray(_chooseObject, 2),
        name = _chooseObject2[0],
        alt = _chooseObject2[1];

    alt = alt.alt;
    var dir = _path2.default.resolve(__dirname, '../interstitials/');
    var file = _fs2.default.readdirSync(dir).filter(function (f) {
        return f.startsWith(name);
    }).map(function (f) {
        return _path2.default.resolve(__dirname, '../interstitials/', f);
    });
    file = _fs2.default.readFileSync(choose(file), { encoding: 'base64' });

    if (production) {
        Crow.post('media/upload', { media_data: file }, function (err, data) {
            // Ignore 131 errors lmao
            if (err && err.code !== 131) throw err;

            console.log('Uploaded image data:', data);
            var mediaMeta = {
                media_id: data.media_id_string,
                alt_text: { text: alt }
            };

            Crow.post('media/metadata/create', mediaMeta, function (err, data, resp) {
                // Ignore 131 errors lmao
                if (err && err.code !== 131) throw err;

                var meta = {
                    status: 'Episode ' + name.split('-')[0],
                    media_ids: [mediaMeta.media_id]
                };

                Crow.post('statuses/update', meta).then(function (data) {
                    console.log('Success!');
                }).catch(function (err) {
                    // There would be an error thrown here if something went wrong.
                    // No clue why Twitter throws 131 errors out of the blue lmao
                    console.log('Error upon posting', err);
                });
            });
        });
    }
} else {
    // Otherwise, simply generate a tweet.
    // Nano: The Markov generator instance
    var Nano = new _markovStrings2.default(_NichijouDict2.default, { stateSize: 1 });
    Nano.buildCorpus();

    var NanoOptions = {
        maxTries: 100,
        filter: function filter(result) {
            return [
            // 1 < result.refs.length,
            10 < result.score].every(function (v) {
                return v;
            });
        }

        // Generate a sentence and send it to Twitter.
    };var phrase = Nano.generate(NanoOptions);

    if (production) {
        Crow.post('statuses/update', { status: phrase.string }).then(function (resp) {
            console.log('Tweeted successfully.');
        }).catch(function (err) {
            console.log('Something happened, couldn’t post tweet.');
            console.log(err);
        });
    }
    console.log(phrase);
}

// ========================================
// helpers ahh
/**
 * Chooses a key/value pair from an object at random
 * @author MindfulMinun
 * @param {Object} object - The object to choose from
 * @returns {Array} - The key/value pair
 * @since 20 Mar 2019
 * @version 0.1.0
**/
function chooseObject(object) {
    var keys = [];
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            // ‘Cause you gotta be sure it’s in there
            keys.push(key);
        }
    }
    var selected = choose(keys);
    return [selected, object[selected]];
}

/**
 * Chooses an element from an array at random
 * @author MindfulMinun
 * @param {Array} arr - The array to choose from
 * @returns {*} - The randomly-chosen element
 * @since 20 Mar 2019
 * @version 0.1.0
**/
function choose(arr) {
    return arr[~~(Math.random() * arr.length)];
}