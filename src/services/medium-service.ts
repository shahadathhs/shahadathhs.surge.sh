export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  categories: string[];
}

export async function fetchMediumPosts(
  username: string,
): Promise<MediumPost[]> {
  try {
    const response = await fetch(`/api/medium?username=${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}
