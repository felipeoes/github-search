import React, { createContext, useContext, useState } from "react";
import { getData, getFollowers, getFollowing, getRepos } from "../services/api";

interface User {
    login: string;
    name: string;
    email: string;
    location: string;
    company: string;
    bio: string;
    avatar_url: string;
    followers_url: string;
    following_url: string;
    organizations_url: string;
    starred_url: string;
    public_repos: string;
    public_gists: string;
    followers: string;
    following: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    repos: any;
    followers: any;
    following: any;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [repos, setRepos] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    async function signIn() {
        const userInfo = await getData();
        const repoInfo = await getRepos();
        const followersInfo = await getFollowers();
        const followingInfo = await getFollowing();
        setUser(userInfo);
        setRepos(repoInfo);
        setFollowers(followersInfo);
        setFollowing(followingInfo);
    }

    function signOut() {
        setUser(null);
        setRepos(undefined);
        setFollowers(undefined);
        setFollowing(undefined);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, repos, followers, following, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}



export { AuthProvider, useAuth };


