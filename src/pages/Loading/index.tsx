import React, { useState } from 'react';
import { Text } from "react-native";
import LottieView from 'lottie-react-native';
import { MainView } from '../../components';

export default function Loading({ value}) {
    const [loading, setLoading] = useState(false);

        if(loading) {
            setTimeout(() => {
            setLoading(false);
        }, 3000)
    }

    return (
        <>     
            <MainView
                style={{ position: 'absolute', width: '100%', height: '100%', flex: 1, alignItems: "center", justifyContent: "center" }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 50,
                        color: "#FFCE00",
                    }}
                >
                    {value} USUÁRIO
          </Text>
                <LottieView
                    style={{ width: 200, height: 200 }}
                    source={require('../../assets/animations/load.json')}
                    autoPlay
                />
            </MainView>
        </>
    )
}