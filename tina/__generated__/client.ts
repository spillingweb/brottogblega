import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '880102ab97ea079571accad7a2ba17657a55fb96', queries,  });
export default client;
  