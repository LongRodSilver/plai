export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'createBet' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat64], [Result], []),
    'getCommissionRate' : IDL.Func([], [IDL.Float64], []),
    'settleMatch' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
