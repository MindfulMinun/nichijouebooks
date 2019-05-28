const data = []

// Within a quote, always use curly quotes and apostrophes
// instead of straight ones.

const ShortThoughts = [
    // Include all of SS, except SS2. They're short and sweet.
    "I wish to go to New Orleans.", // Ep3
    // Omit SS2, too long.
    "I drew this while listening to jazz.",
    "After a bath, I drink a glass of milk and pretend to be drunk.",
    "I want to use some “pretty sharp” quotation marks.",
    "Why do I cough just before the movie starts, at the movie theater?",
    "I respond to praise. But I never receive any.",
    "If you search for it, you’ll find everything.",
    "Bubbly, carbonated drinks make you feel awake.",
    "A month passes quickly, but Sunday seems so far away.", // Ep13 @ 18:20
    "When asked, “What are you doing?”, she replied, “Spinning.”",
    "I’ll use all my reserves.",
    "When I can, I like to pretend I know everyone.",
    "She always ends up carrying her to bed.",
    "There is no “that is fine”. There is no “this is fine”. That is fine.",
    "I break when no one sees me.",
    "There wasn’t any point.",
    "Even when wasting time, talent is still talent.",
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
    "I don’t suppose I could borrow some money?",
    "Don’t get cocky over a few favors.",
    // HS?, E13
    "I thought I was getting on the bus, but I was getting on the wave of time.",
    // HS10
    "This coffee isn’t very coffee coffee!",
    "It’s not coffee coffee!",
    // HS?, E24
    "I promise I won’t tell anyone.",
    "If I ever tell, I’ll give you one million yen."
]

// Put random quotes in order of the part in which they appear.
const Random = [
    // Part 9
    "Selamat pagi!",
    // Part 13
    "Are you ready for the real battle?",
    // Sasahara 1, Ep4 @ ~ 2:45 / 3:42
    "Tell the chef... it was delicious!",
    "Our everyday lives may, in fact, be a series of miracles.",
    // ---
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

// Episode 13
const Ep13 = [
    // Ep13 @ 3:55 ~ 6:48
    "I thought I’d perform that magic trick I told you about...",
    "How sick are you?",
    "Rest in peace.",
    // 80-Point Mongolian: Ep13 @ 9:15 ~
    "Do you want me to tell you how I got 80 points?",
    "It takes tremendous effort... and heart.",
    // Reality: Ep13 @ 10:40 ~ 11:25
    "I’ll play with my grandson all day and forget reality’s unpleasentness.",
    "This is worse than reality...",
    // Part 55: Ep13 @ 12:09 ~ 18:00
    "Kids are so hopeless.",
    "Sakamoto, you’re small and weak, so you don’t have to.",
    // "Don’t you think the girl wants to go to school?",
    "It’s scary to go alone, but it’s okay if we’re together."
]

data.push(...ShortThoughts)
data.push(...LikeLove)
data.push(...HelveticaStandard)
data.push(...Random)
data.push(...Ep13)

export default data
