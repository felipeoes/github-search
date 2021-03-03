import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { getData, getFollowers, getFollowing, getRepos, octokit } from "../services/api";
import { token } from '../services/api';

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
    loading: boolean;
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadStorageData() {

            try {
                // const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
                // const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

                // if (storagedUser && storagedToken) {
                //     setUser(JSON.parse(storagedUser));

                //     octokit.defaults.headers.Authorization = `Baerer ${storagedToken}`;
                // }
                setLoading(false);
            }
            catch (error) {
                console.log("Error while trying to get asyncstorage");
            }

        }

        loadStorageData();
    });

    async function signIn() {
        const userInfo = await getData();
        const repoInfo = await getRepos();
        const followersInfo = await getFollowers();
        const followingInfo = await getFollowing();
        setUser(userInfo);
        setRepos(repoInfo);
        setFollowers(followersInfo);
        setFollowing(followingInfo);

        octokit.defaults.headers.Authorization = `Baerer ${token}`;

        try {
            // await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(userInfo));
            // await AsyncStorage.setItem('@RNAuth:token', String(token));
            
        }
        catch (error) {
            console.log("Error while trying to set asyncstorage");
        }

    }

    async function signOut() {
        try {
            await AsyncStorage.clear();
            setUser(null);
            setRepos(undefined);
            setFollowers(undefined);
            setFollowing(undefined);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, repos, followers, following, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}



export { AuthProvider, useAuth };


