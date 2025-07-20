// API client that can switch between static and dynamic data sources
export interface Post {
  slug: string;
  title: string;
  content: string;
  date: string;
  categories: string[];
  excerpt?: string;
  year?: string;
  month?: string;
  day?: string;
  titleSlug?: string;
}

export interface APIClient {
  getPosts(page?: number, limit?: number): Promise<Post[]>;
  getPost(slug: string): Promise<Post>;
  getCategories(): Promise<string[]>;
  getPostsByCategory(category: string): Promise<Post[]>;
}

// Static implementation (current)
export class StaticAPIClient implements APIClient {
  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    // This will be replaced with actual static data fetching
    // For now, returns empty array
    return [];
  }

  async getPost(slug: string): Promise<Post> {
    throw new Error('Not implemented');
  }

  async getCategories(): Promise<string[]> {
    return [];
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    return [];
  }
}

// Dynamic implementation (future)
export class DynamicAPIClient implements APIClient {
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseURL = baseURL;
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const response = await fetch(
      `${this.baseURL}/api/v1/posts?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  }

  async getPost(slug: string): Promise<Post> {
    const response = await fetch(`${this.baseURL}/api/v1/posts/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  }

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${this.baseURL}/api/v1/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    const response = await fetch(
      `${this.baseURL}/api/v1/categories/${category}/posts`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch posts by category');
    }
    return response.json();
  }
}

// Factory function to get the appropriate client
export function getAPIClient(): APIClient {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    return new DynamicAPIClient();
  }
  return new StaticAPIClient();
}