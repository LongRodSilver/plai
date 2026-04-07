import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as bettingIdl } from '../../../src/declarations/betting/betting.did.js';
import { idlFactory as authIdl } from '../../../src/declarations/auth/auth.did.js';
import type { _SERVICE as BettingService } from '../../../src/declarations/betting/betting.did.d.ts';
import type { _SERVICE as AuthService } from '../../../src/declarations/auth/auth.did.d.ts';

const IS_LOCAL = import.meta.env.VITE_DFX_NETWORK !== 'ic';
const HOST = IS_LOCAL ? 'http://127.0.0.1:4943' : 'https://icp-api.io';

/**
 * Creates an HttpAgent, optionally authenticated with a custom identity.
 * On local development, fetches the root key from the replica.
 */
export function createAgent(identity?: Parameters<typeof HttpAgent.createSync>[0]['identity']) {
  const agent = HttpAgent.createSync({ host: HOST, identity });
  if (IS_LOCAL) {
    agent.fetchRootKey().catch(() => {
      console.warn('[ICP] Could not fetch root key — is the local replica running?');
    });
  }
  return agent;
}

/**
 * Creates an authenticated betting canister actor.
 */
export function createBettingActor(
  agent: HttpAgent = createAgent(),
): BettingService {
  const canisterId = import.meta.env.VITE_CANISTER_ID_BETTING;
  return Actor.createActor<BettingService>(bettingIdl, { agent, canisterId });
}

/**
 * Creates an authenticated auth canister actor.
 */
export function createAuthActor(
  agent: HttpAgent = createAgent(),
): AuthService {
  const canisterId = import.meta.env.VITE_CANISTER_ID_AUTH;
  return Actor.createActor<AuthService>(authIdl, { agent, canisterId });
}
