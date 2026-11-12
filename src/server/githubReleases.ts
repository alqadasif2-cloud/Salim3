/**
 * GitHub Releases Integration Stub
 */

export interface GitHubSettingsSummary {
  configured: boolean;
  owner?: string;
  repo?: string;
  releaseTag?: string;
}

const jobProgressMap = new Map<string, any>();

export async function getSavedGitHubSettingsSummary(): Promise<GitHubSettingsSummary> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  return {
    configured: Boolean(token && repo),
    owner: repo ? repo.split('/')[0] : undefined,
    repo: repo ? repo.split('/')[1] : undefined,
  };
}

export async function checkGitHubRepositoryStatus(): Promise<{ accessible: boolean; error?: string }> {
  return { accessible: false, error: 'GitHub repository credentials not configured' };
}

export async function publishApkToGitHubRelease(params: {
  apkBuffer: Buffer;
  fileName: string;
  versionName: string;
  versionCode: number;
  releaseNotes?: string;
}): Promise<{ success: boolean; releaseUrl?: string; error?: string }> {
  return {
    success: false,
    error: 'GitHub release publishing requires GITHUB_TOKEN and GITHUB_REPOSITORY',
  };
}

export function getUploadJobProgress(jobId: string): any {
  return jobProgressMap.get(jobId) || null;
}

export function setUploadJobProgress(jobId: string, progress: any): void {
  jobProgressMap.set(jobId, progress);
}
