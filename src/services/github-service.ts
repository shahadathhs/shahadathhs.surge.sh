export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

export const fetchGithubRepos = async (
  username: string,
): Promise<GithubRepo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }
    const data: GithubRepo[] = await response.json();
    return data.filter((repo) => !repo.fork); // Filter out forks by default
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

export const fetchRepoDetails = async (
  owner: string,
  repo: string,
): Promise<GithubRepo | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );
    if (!response.ok) {
      throw new Error('Failed to fetch repo details');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching repo details for ${owner}/${repo}:`, error);
    return null;
  }
};
