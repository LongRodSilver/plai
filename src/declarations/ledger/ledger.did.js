export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'icrc1_balance_of' : IDL.Func(
        [
          IDL.Record({
            'owner' : IDL.Principal,
            'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
          }),
        ],
        [IDL.Nat],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
