export const idlFactory = ({ IDL }) => {
  const MatchStatus = IDL.Variant({
    'open'     : IDL.Null,
    'closed'   : IDL.Null,
    'resolved' : IDL.Null,
  });
  const Match = IDL.Record({
    'id'         : IDL.Text,
    'team1'      : IDL.Text,
    'team2'      : IDL.Text,
    'tournament' : IDL.Text,
    'pool'       : IDL.Nat,
    'status'     : MatchStatus,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'createBet'        : IDL.Func([IDL.Text, IDL.Text, IDL.Nat64], [Result], []),
    'getCommissionRate': IDL.Func([], [IDL.Float64], ['query']),
    'getOpenMatches'   : IDL.Func([], [IDL.Vec(Match)], ['query']),
    'settleMatch'      : IDL.Func([IDL.Text, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
