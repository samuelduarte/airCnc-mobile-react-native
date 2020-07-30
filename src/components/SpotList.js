import React, {useEffect, useState} from 'react';
import { View , Text, StyleSheet, FlatList,TouchableOpacity, Image} from 'react-native';
import api from '../services/api';
export default function SpotList({ tech }){

    const [Spots, setSpots] = useState([]);
    useEffect( ()=> {

        async function loadSpots(){

            const response = await api.get('/spots', {
                params: { tech }
            });

            setSpots(response.data);

            
        }

        loadSpots();

    }, [])

    return(
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que Usam: <Text style={styles.bold}>{tech}</Text></Text>
        </View>

        <FlatList
         styles={styles.list}
         data={Spots}
         keyExtractor={spot => spot._id}
         horizontal
         showsHorizontalScrollIndicator={false}
         renderItem={ ({ item }) => (
            <View style={styles.listItem}>
                <Image style={styles.imagem} source={ { uri: item.thumbnail_url }} />
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.price}>{item.company ? `${item.price}/Dia` : 'Gratuito'}</Text>

                <TouchableOpacity onPress={()=> {}} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
            </View>
         )}
         />


    </>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15

    },
    bold:{
        fontWeight:'bold',
    },
    list:{
        paddingHorizontal: 20,
    },
    listItem:{
        marginRight: 15,
    },
    imagem: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
        backgroundColor: "#444",
    },
});