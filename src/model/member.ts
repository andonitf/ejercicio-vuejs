export interface Member {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  created_at: number;
  updated_at: number;
}

export const createDefaultMember = () => ({
  id: -1,
  login: '',
  avatar_url: '',
  html_url: '',
  url: '',
  name: '',
  company: '',
  blog: '',
  location: '',
  email: '',
  bio: '',
  public_repos: '',
  public_gists: '',
  followers: '',
  following: '',
  updated_at: 0,
  created_at: 0
});
