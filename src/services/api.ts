
import { Octokit } from "@octokit/core";
import { state } from "../pages/Auth";
// import { GITHUB_TOKEN } from '@env';

export const token = process.env.GITHUB_TOKEN;

export const octokit = new Octokit({
  auth: token,
});

export const getData = async () => {
  try {
    const data = await octokit.request(`GET /users/${state.username}`);

    return data.data;
  } catch (error) {
    console.log("error while calling octokict");
  }

};

export const getRepos = async () => {
  try {
    const data = await octokit.request(`GET /users/${state.username}/repos`);

    return data.data;
  } catch (error) {
    console.log("error while calling octokict");
  }

};

export const getFollowers = async () => {
  try {
    const data = await octokit.request(`GET /users/${state.username}/followers`);

    return data.data;
  } catch (error) {
    console.log("error while calling octokict");
  }

};

export const getFollowing = async () => {
  try {
    const data = await octokit.request(`GET /users/${state.username}/following`);

    return data.data;
  } catch (error) {
    console.log("error while calling octokict");
  }

};



export default octokit;