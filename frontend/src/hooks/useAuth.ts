import { AuthClient } from "@dfinity/auth-client";
import type { Identity } from "@dfinity/agent";
import { useEffect, useState, useCallback } from "react";

interface AuthState {
  isAuthenticated: boolean;
  principal: string | null;
  identity: Identity | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize AuthClient on mount
  useEffect(() => {
    AuthClient.create()
      .then(async (client) => {
        setAuthClient(client);
        const authenticated = await client.isAuthenticated();
        if (authenticated) {
          const id = client.getIdentity();
          const p = id.getPrincipal().toText();
          // Guard against anonymous principal (means auth silently failed)
          if (p !== "2vxsx-fae") {
            setIsAuthenticated(true);
            setIdentity(id);
            setPrincipal(p);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("AuthClient.create() failed:", err);
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async () => {
    if (!authClient) return;

    // TODO: restore local II URL when dfx replica is running
    // const localII = "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8000";
    const identityProvider = "https://identity.ic0.app";

    return new Promise<void>((resolve, reject) => {
      authClient.login({
        identityProvider,
        // 8 hours in nanoseconds per internet-identity skill recommendation
        maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000),
        onSuccess: () => {
          const id = authClient.getIdentity();
          const p = id.getPrincipal();

          if (!p.isAnonymous()) {
            setIsAuthenticated(true);
            setIdentity(id);
            setPrincipal(p.toText());
          }

          setIsLoading(false);
          resolve();
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setIsLoading(false);
          reject(error);
        },
      });
    });
  }, [authClient]);

  const logout = useCallback(async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
  }, [authClient]);

  return { isAuthenticated, principal, identity, isLoading, login, logout };
}
