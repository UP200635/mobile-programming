import React from 'react';
import { Text, View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useParams } from 'react-router-native';
import { useEffect, useState } from 'react';

import PokemonInfo from '../components/PokemonInfo';
import Skills from '../components/Skills';
import HomeButton from '../components/HomeButton';

// Servicios 
import { getPokemonById } from '../services/pokeapi';

const Information = () => {
    const [pokemon, setPokemon] = useState(null);
    const { pokemonid } = useParams();

    useEffect(() => {
        // Manera de Hacelo con promesas
        // getPokemonById(pokemonid)
        //     .then((pokeInofrmation) => {
        //         console.log(pokeInofrmation);
        //     })
        //     .catch((error) => {
        //     })
        //     .finally(() => {

        //     });

        // Async/Await -> Funcion 
        // const fn = async () => {
        //     const pokeInformation = await getPokemonById(pokemonid);

        //     console.log(pokeInformation);
        // };
        // fn();

        // Async/Await -> IEFI
        (async () => {
            try {
                const pokeInformation = await getPokemonById(pokemonid);
                setPokemon(pokeInformation);
            } catch (error) {
                console.error(error);
            } finally {
                console.log('end!!!');
            }
        })();
    }, [pokemonid]);

    return (
        <ImageBackground source={require('../../assets/fondo.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                {pokemon ? (
                    <ScrollView>
                        <PokemonInfo/>
                        <Skills/>
                        <HomeButton/>
                    </ScrollView>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});

export default Information;
