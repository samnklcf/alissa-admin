import axios from 'axios';

const openaiApiKey = "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";

const askGPT = async (question) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: question,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error asking GPT:', error);
    throw error;
  }
};

export default askGPT;