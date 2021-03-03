import React from 'react';
import { useAuth } from "../contexts/auth";
import AuthRoutes from '../routes/authRoutes';
import AppRoutes from '../routes/appRoutes';
import { View, ActivityIndicator } from "react-native";

export default function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}

