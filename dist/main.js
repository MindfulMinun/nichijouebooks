'use strict';

var _markovStrings = require('markov-strings');

var _markovStrings2 = _interopRequireDefault(_markovStrings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markov = new _markovStrings2.default(['Lorem ipsum dolor sit amet, consectetur adipisicing elit', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Laboris nisi ut aliquip ex ea commodo consequat.'], { stateSize: 1 });
markov.buildCorpus();

var options = {
    maxTries: 100,
    filter: function filter(result) {
        return 1 < result.refs.length;
    }

    // Generate a sentence
    // const result = markov.generate(options)
};console.log(markov.generate(options));