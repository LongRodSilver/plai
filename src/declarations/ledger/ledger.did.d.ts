import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'icrc1_balance_of' : ActorMethod<
    [{ 'owner' : Principal, 'subaccount' : [] | [Uint8Array | number[]] }],
    bigint
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
