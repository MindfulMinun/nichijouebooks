const data = []

// Within a quote, always use curly quotes and apostrophes
// instead of straight ones.

const ShortThoughts = [
    // Include all of SS, except SS2. They're short and sweet.
    "I wish to go to New Orleans.",
    // Omit SS2, too long.
    "I drew this while listening to jazz.",
    "After a bath, I drink a glass of milk and pretend to be drunk.",
    "I want to use some “pretty sharp” quotation marks.",
    "Why do I cough just before the movie starts, at the movie theater?",
    "I respond to praise. But I never receive any.", //
    "If you search for it, you’ll find everything.", //
    "Bubbly, carbonated drinks make you feel awake.",
    "A month passes quickly, but Sunday seems so far away.",
    "When asked, “What are you doing?”, she replied, “Spinning.”",
    "I’ll use all my reserves.",
    "When I can, I like to pretend I know everyone.",
    "She always ends up carrying her to bed.",
    "There is no “that is fine”. There is no “this is fine”. That is fine.",
    "I break when no one sees me.",
    "There wasn’t any point.",
    "Even when wasting time, talent is still talent.", //
    "In the end, everyone hopes for a happy ending.",
    "It is a big deal.",
    "Now that I think about it, I haven’t been shy this year.",
    "I realized that daydreaming is free."
]

// TODO: Finish gathering short quotes from LL.
const LikeLove = [
    // LL2:
    "Hey. You want to run?",
    // LL5:
    "I hope I get accepted to Tokisadame High School.",
    "I hope the person below gets accepted!! You can do it!",
    // LL10:
    "Cold attack!"
]

// TODO: Finish gathering short quotes from HS.
const HelveticaStandard = [
    // HS2
    "I don’t suppose I could borrow some money.",
    "Don’t get cocky over a few favors.",
    // HS10
    "This coffee isn’t very coffee coffee!",
    "It’s not coffee coffee!",
    // HS?, E24
    "I promise I won’t tell anyone.",
    "If I ever tell, I’ll give you one million yen."
]

const Random = [
    // Part 71
    "My glasses... My glasses...",
    // Part 96
    "Boil me or fry me! Do whatever you want with me!",
    // Part 98
    "I think you’re a little too young for these!",
    // Part 106
    "If we show up late together, people will get the wrong idea.",
    // Idk
    "Jan, ken, pon!",
]

data.push(...ShortThoughts)
data.push(...LikeLove)
data.push(...HelveticaStandard)
data.push(...Random)

export default data
