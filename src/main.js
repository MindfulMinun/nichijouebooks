// Twit: the library for connecting to Twitter
// Markov: the Markov chain text generator
// SelamatPagi: the dictionary with all the Nichijou quotes
// that Markov will generate from.
import Twit from 'twit'
import Markov from 'markov-strings'
import SelamatPagi from './NichijouDict.js'

const production = /production/i.test(process.env.NODE_ENV || '')
require('dotenv').config()

// Crow: The Twit client instance
// Reference to the talking crow in Nichijou E17
const Crow = new Twit({
    consumer_key:         process.env.C_KEY,
    consumer_secret:      process.env.C_SECRET,
    access_token:         process.env.A_TOKEN,
    access_token_secret:  process.env.A_SECRET,
    timeout_ms:           60 * 1000,
    strictSSL:            true
})

// Nano: The Markov generator instance
const Nano = new Markov(SelamatPagi, { stateSize: 1 })
Nano.buildCorpus()

const NanoOptions = {
    maxTries: 100,
    filter: (result) => {
        return [
            // 1 < result.refs.length,
            10 < result.score
        ].every(v => v)
    }
}

// Generate a sentence and send it to Twitter.
let phrase = Nano.generate(NanoOptions)

if (production) {
    Crow.post('statuses/update', { status: phrase.string })
        .then(resp => {
            console.log('Tweeted successfully.', phrase)
        })
        .catch(err => {
            console.log('Something happened, couldn’t post tweet.')
            console.log(err)
        })
} else {
    console.log(phrase)
}
