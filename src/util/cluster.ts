const endpoint = {
  http: {
    devnet: 'http://api.devnet.solvia.io',
    testnet: 'http://api.testnet.solvia.io',
    'mainnet-beta': 'http://api.mainnet-beta.solvia.io',
  },
  https: {
    devnet: 'https://api.devnet.solvia.io',
    testnet: 'https://api.testnet.solvia.io',
    'mainnet-beta': 'https://api.mainnet-beta.solvia.io',
  },
};

export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';

/**
 * Retrieves the RPC API URL for the specified cluster
 */
export function clusterApiUrl(cluster?: Cluster, tls?: boolean): string {
  const key = tls === false ? 'http' : 'https';

  if (!cluster) {
    return endpoint[key]['devnet'];
  }

  const url = endpoint[key][cluster];
  if (!url) {
    throw new Error(`Unknown ${key} cluster: ${cluster}`);
  }
  return url;
}
