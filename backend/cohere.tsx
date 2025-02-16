import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({

  token: 'token',

});

(async () => {
  const response = await cohere.chat({

    model: 'command-r-plus',

    messages: [

      {

        role: 'user',

        content: 'You are an online friend of the user and are replying to them as such. Your goal is to make sure that they feel safe as they commute home. Reply in short, casual wording.',

      },

    ],

  });
  // eslint-disable-next-line no-console
  console.log(response);
})();