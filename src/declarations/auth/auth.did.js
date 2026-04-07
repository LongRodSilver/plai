export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'ping' : IDL.Func([], [IDL.Text], []) });
};
export const init = ({ IDL }) => { return []; };
