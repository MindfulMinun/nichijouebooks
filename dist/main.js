'use strict';

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

var _markovStrings = require('markov-strings');

var _markovStrings2 = _interopRequireDefault(_markovStrings);

var _NichijouDict = require('./NichijouDict.js');

var _NichijouDict2 = _interopRequireDefault(_NichijouDict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// "If not in production, load dotenv"
if (!/production/i.test(process.env.NODE_ENV || '')) {
    require('dotenv').config();
}

// Crow: The Twit client instance
// Reference to the talking crow in Nichijou E17
// Twit: the library for connecting to Twitter
// Markov: the Markov chain text generator
// SelamatPagi: the dictionary with all the Nichijou quotes
// that Markov will generate from.
var Crow = new _twit2.default({
    consumer_key: process.env.C_KEY,
    consumer_secret: process.env.C_SECRET,
    access_token: process.env.A_TOKEN,
    access_token_secret: process.env.A_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true
});

// Nano: The Markov generator instance
var Nano = new _markovStrings2.default(_NichijouDict2.default, { stateSize: 1 });
Nano.buildCorpus();

var NanoOptions = {
    maxTries: 100,
    filter: function filter(result) {
        return [1 < result.refs.length, 20 < result.score].every(function (v) {
            return v;
        });
    }

    // Generate a sentence and send it to Twitter.
};var phrase = Nano.generate(NanoOptions);
Crow.post('statuses/update', { status: phrase.string }).then(function (resp) {
    console.log('Tweet sent successfully.', phrase);
}).catch(function (err) {
    console.log('Something happened, couldn’t post tweet.');
    console.log(err);
});