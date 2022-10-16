// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const runModel = async (inputPrompt) => {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Summarize this for a second-grade student:\n\n${inputPrompt}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].text
}

export default async function handler(req, res) {
    console.log(req.body)
    let output = await runModel(req.body.prompt);
    res.status(200).json({ output })
}
