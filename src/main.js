import Markov from 'markov-strings'

const markov = new Markov([
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    'Laboris nisi ut aliquip ex ea commodo consequat.'
], { stateSize: 1 })
markov.buildCorpus()

const options = {
    maxTries: 100,
    filter: (result) => {
        return 1 < result.refs.length
    }
}

// Generate a sentence
// const result = markov.generate(options)
console.log(
    markov.generate(options)
)
