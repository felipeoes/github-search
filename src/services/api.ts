import { Octokit } from "@octokit/core";
import { state } from "../pages/Auth";
import { GITHUB_TOKEN } from "@env";

export const token = GITHUB_TOKEN;

export const octokit = new Octokit({
  auth: token,
});

export const getData = async () => {
  const data = await octokit.request(`GET /users/${state.username}`);

  return data.data;
};

export const getRepos = async () => {
  const data = await octokit.request(`GET /users/${state.username}/repos`);

  return data.data;
};

export const getFollowers = async () => {
  const data = await octokit.request(`GET /users/${state.username}/followers`);

  return data.data;
};

export const getFollowing = async () => {
  const data = await octokit.request(`GET /users/${state.username}/following`);

  return data.data;
};

export default octokit;
