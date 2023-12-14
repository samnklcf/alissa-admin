const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

export default function handler(req, res) {
  async function sam() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const openai = new OpenAIApi(configuration);
      let promptSend = req.body.promptSend;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptSend,
        temperature: 0.9,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });

      res.status(200).json(response.data.choices[0].text);
      
    } catch (error) {
      console.log(error.message);
    }
  }
  sam();
}
