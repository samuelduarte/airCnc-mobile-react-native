import React, { useState, useEffect} from 'react';
import { View ,Image, AsyncStorage, Text,KeyboardAvoidingView,Platform, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';



export default function Login( { navigation } ){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=>{

        AsyncStorage.getItem('user').then(user =>{
                if(user){
                    navigation.navigate('List');
                }
        });

    },[])
    
    async function handleSubmit(){

        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');

    }

    return(
     <KeyboardAvoidingView  enabled={Platform.OS == 'ios'}  behavior="padding" style={styles.container}>
        <Image source={logo} />

        <View style={styles.form}>
                <Text style={styles.label}> SEU E-MAIL: * </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Informe o Seu Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}> TECNOLOGIAS: * </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Informe as Tecnologias"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    autoCapitalize="words"
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
        </View>  
    </KeyboardAvoidingView>
)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
        form:{
        paddingHorizontal: 30,
        alignItems: 'stretch',
        marginTop: 30
        },

        label:{
            fontWeight: 'bold',
            color: '#444',
            textAlign: "auto",
            marginBottom: 8,
            fontSize: 16,
        },  
        input:{
            borderWidth: 1,
            borderColor: "#fff",
            paddingHorizontal: 20,
            fontSize: 16,
            color: "#fff",
            width: 250,
            height: 44,
            backgroundColor: '#444',
            marginBottom: 20,
            borderRadius: 2
        },
        button:{
            backgroundColor: '#f05a5b',
            height: 42,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
        },
        buttonText:{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
});