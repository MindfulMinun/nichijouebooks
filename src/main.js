// path/fs: To fetch the interstitials
// Twit: the library for connecting to Twitter
// Markov: the Markov chain text generator
// SelamatPagi: the dictionary with all the Nichijou quotes
// that Markov will generate from.
import path from 'path'
import fs from 'fs'
import Twit from 'twit'
import Markov from 'markov-strings'
import SelamatPagi from './NichijouDict.js'

const production = /production/i.test(process.env.NODE_ENV || '')
require('dotenv').config()

const args = process.argv.slice(2)

// Crow: The Twit client instance
// Reference to the talking crow in Nichijou E17
const Crow = new Twit({
    consumer_key:         process.env.C_KEY,
    consumer_secret:      process.env.C_SECRET,
    access_token:         process.env.A_TOKEN,
    access_token_secret:  process.env.A_SECRET,
    timeout_ms:           30 * 1000,
    strictSSL:            true
})

if (args.some(v => ['-i', '--interstitial', '--interstitials'].includes(v))) {
    // Make an interstitial!
    // Import the interstitials data
    const data = require(
        path.resolve(__dirname, '../interstitials/info.json')
    )

    // Choose an image, get its alt text data
    var [name, alt] = chooseObject(data)
    alt = alt.alt
    var dir = path.resolve(__dirname, '../interstitials/')
    var file = fs.readdirSync(dir)
        .filter((f) => f.startsWith(name))
        .map((f) => path.resolve(__dirname, '../interstitials/', f))
    file = fs.readFileSync(choose(file), { encoding: 'base64' })

    if (production) {
        Crow.post('media/upload', { media_data: file }, (err, data) => {
            // Ignore 131 errors lmao
            if (err && err.code !== 131) throw err

            console.log('Uploaded image data:', data)
            var mediaMeta = {
                media_id: data.media_id_string,
                alt_text: { text: alt }
            }

            Crow.post('media/metadata/create', mediaMeta, (err, data, resp) => {
                // Ignore 131 errors lmao
                if (err && err.code !== 131) throw err

                var meta = {
                    status: `Episode ${name.split('-')[0]}`,
                    media_ids: [mediaMeta.media_id]
                }

                Crow.post('statuses/update', meta)
                .then(data => {
                    console.log('Success!')
                })
                .catch(err => {
                    // There would be an error thrown here if something went wrong.
                    // No clue why Twitter throws 131 errors out of the blue lmao
                    console.log('Error upon posting', err)
                })
            })

        })
    }

} else {
    // Otherwise, simply generate a tweet.
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
                console.log('Tweeted successfully.')
            })
            .catch(err => {
                console.log('Something happened, couldn’t post tweet.')
                console.log(err)
            })
    }
    console.log(phrase)
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
    var keys = []
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            // ‘Cause you gotta be sure it’s in there
            keys.push(key)
        }
    }
    var selected = choose(keys);
    return [selected, object[selected]]
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
    return arr[~~(Math.random() * arr.length)]
}
