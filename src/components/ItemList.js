import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default props => (

    <View style={styles.container}>
        <View style={styles.info}>
            <Image
                style={[styles.image, props.issue ? { borderRadius: 50 } : {}]}
                source={{ uri: props.ownerAvatar }} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{props.name}</Text>
                <Text style={styles.subtitle}>{props.ownerName}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => props.onSelectRepo(props)}>
            <Icon style={styles.icon} name="chevron-right" size={30} color="rgba(0,0,0,0.3)" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FBFBFB'
    },
    info: {
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 3
    },
    content: {
        justifyContent: 'space-between',
        maxWidth: '70%',
        marginLeft: 10
    },
    title: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 20,
    },
    subtitle: {
    },
    icon: {
    }
});