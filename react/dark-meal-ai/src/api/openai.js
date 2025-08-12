// import OpenAI from 'openai';

// const client = new OpenAI({
//   apiKey: import.meta.env['OPENAI_API_KEY'],
// });

// export default client;

import { lazy } from "react";

const puter = lazy(() => import('https://js.puter.com/v2/'));

export default puter;