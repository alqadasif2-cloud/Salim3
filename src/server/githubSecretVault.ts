/**
 * GitHub Secret Vault stub
 */

export async function saveGitHubCredentialsToVault(credentials: {
  token: string;
  repo: string;
}): Promise<boolean> {
  if (credentials.token) {
    process.env.GITHUB_TOKEN = credentials.token;
  }
  if (credentials.repo) {
    process.env.GITHUB_REPOSITORY = credentials.repo;
  }
  return true;
}
