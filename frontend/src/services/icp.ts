import { HttpAgent } from '@dfinity/agent';

const IS_LOCAL = import.meta.env.VITE_DFX_NETWORK !== 'ic';
const HOST = IS_LOCAL ? 'http://127.0.0.1:4943' : 'https://icp-api.io';

export const agent = HttpAgent.createSync({ host: HOST });

// In actual runtime, import the candid interfaces:
// import { idlFactory as bettingIdl } from '../../../declarations/betting';
//
// export const createBettingActor = (canisterId: string, customAgent = agent) => {
//   if (IS_LOCAL) {
//     customAgent.fetchRootKey().catch(console.warn);
//   }
//   return Actor.createActor(bettingIdl, { agent: customAgent, canisterId });
// };
