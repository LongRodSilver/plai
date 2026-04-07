import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type MatchStatus = { 'open' : null } |
  { 'closed' : null } |
  { 'resolved' : null };

export interface Match {
  'id' : string,
  'team1' : string,
  'team2' : string,
  'tournament' : string,
  'pool' : bigint,
  'status' : MatchStatus,
}

export type Result = { 'ok' : string } |
  { 'err' : string };

export interface _SERVICE {
  'createBet' : ActorMethod<[string, string, bigint], Result>,
  'getCommissionRate' : ActorMethod<[], number>,
  'getOpenMatches' : ActorMethod<[], Array<Match>>,
  'settleMatch' : ActorMethod<[string, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
