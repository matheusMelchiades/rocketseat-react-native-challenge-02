import React, { Component } from 'react';
import api from '../services/api';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from '../components/ItemList';

export default class Repositories extends Component {
    state = {
        input: '',
        repositories: [],
        inputValid: true,
        errorText: ''
    };

    static navigationOptions = {
        headerTitle: 'Repositories'
    };

    componentDidMount = async () => {
        const repos = await AsyncStorage.getItem('@GITREPO:repositories');
        if (repos)
            this.setState({ repositories: JSON.parse(repos) })
    };

    reloadStorage = async () => {
        const repositories = this.state.repositories;
        await AsyncStorage.setItem('@GITREPO:repositories', JSON.stringify(repositories))
    };

    selectRepo = (props) => {
        this.props.navigation.navigate('Issues', props);
    };

    handleMessageError = (status, msg) => {
        this.setState({ inputValid: status, errorText: msg })
    }

    addRepo = async () => {
        const input = this.state.input;

        if (!input || !input.includes('/')) return (this.handleMessageError(false, 'Format invalid'));

        const owner = input.split('/')[0]
        const nameRepo = input.split('/')[1]

        if (!owner && !!nameRepo) return (this.handleMessageError(false, 'Repository Invalid'));


        try {
            const result = await api.get(`repos/${owner}/${nameRepo}`);

            if (result.status === 200) {
                const repo = {
                    id: result.data.id,
                    name: result.data.name,
                    ownerName: result.data.owner.login,
                    ownerAvatar: result.data.owner.avatar_url,
                    fullName: result.data.full_name
                }

                const repositories = this.state.repositories
                this.setState({ repositories: [...repositories, repo] }, this.reloadStorage);
                this.handleMessageError(true);
            }
        } catch (err) {
            if (err.response.status === 404) {
                this.handleMessageError(false, 'Repository not found')
            }
        }
    };

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.addRepo}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(input) => this.setState({ input })}
                        value={this.state.input}
                        placeholder="Add new Repository" />

                    <TouchableOpacity onPress={this.addRepo}>
                        <Icon style={styles.icon} name="plus" size={25} />
                    </TouchableOpacity>
                </View>

                {
                    !this.state.inputValid ?
                        <View style={styles.errorInput}>
                            <Text style={styles.errorInputText}>{this.state.errorText}</Text>
                        </View> : false
                }

                <View style={styles.line} />

                <FlatList
                    data={this.state.repositories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ItemList {...item} onSelectRepo={this.selectRepo} />
                    )} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 3,
        padding: 10,
        backgroundColor: '#DADADA'
    },
    addRepo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
    },
    input: {
        borderRadius: 5,
        width: '88%',
        height: 35,
        fontSize: 14,
        padding: 5,
        backgroundColor: '#FFF'
    },
    icon: {

    },
    line: {
        height: 1,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    errorInput: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorInputText: {
        color: 'red',
        fontWeight: 'bold'
    }
})