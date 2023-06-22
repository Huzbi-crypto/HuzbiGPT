// Description: This is the main file for the bot. It will be used to connect to the Discord API and OpenAI API.
// Author: Huzbi
// Description: This is the main file for the bot. It will be used to connect to the Discord API and OpenAI API. We will be
// using the Eris library to connect to the Discord API and the OpenAI API to connect to the OpenAI API. We will also be
// using the dotenv library to store our API keys in a .env file. We will be using the OpenAI API to generate responses
// to messages sent in the Discord server. We will be using the Eris library to connect to the Discord API and the OpenAI
// API to connect to the OpenAI API. We will also be using the dotenv library to store our API keys in a .env file. We will
// be using the OpenAI API to generate responses to messages sent in the Discord server.

const Eris = require("eris");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bot = new Eris(process.env.DISCORD_BOT_TOKEN);({
    intents: ["guildMessages"]
}) 

async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
    });
    return completion.data.choices[0].text;
}

bot.on("ready", () => {
    console.log("Huzbi is ready to go!");
})

bot.on("error", (err) => {
    console.log(err);
})

bot.on("messageCreate", (msg) => {
    if(msg.content.startsWith("huzbi:")) {
        runCompletion(msg.content.substring(1)).then(result => bot.createMessage(msg.channel.id, result));
    }
})

bot.connect();