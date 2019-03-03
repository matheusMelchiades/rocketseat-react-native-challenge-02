import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import api from '../services/api';
import ItemList from '../components/ItemList';


export default class Issues extends Component {
    state = {
        name: this.props.navigation.getParam('name'),
        fullName: this.props.navigation.getParam('fullName'),
        issues: [],
        state: 'all',
        refresh: false
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name')
    })

    async componentDidMount() {
        this.loadIssues();
    }

    loadIssues = async () => {
        const result = await api.get(`repos/${this.state.fullName}/issues?state=${this.state.state}`);
        this.setState({ issues: result.data })
    };

    selectItem = (props) => {
        Linking.openURL(props.url);
    };

    onRefresh = async () => {
        this.setState({ refresh: true })

        this.loadIssues();

        if (this.state.issues.length)
            this.setState({ refresh: false });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.setState({ state: 'all' }, this.loadIssues)}>
                        <Text style={styles.buttonText}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={() => this.setState({ state: 'open' }, this.loadIssues)}>
                        <Text style={styles.buttonText}>Opened</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={() => this.setState({ state: 'closed' }, this.loadIssues)}>
                        <Text style={styles.buttonText}>Closed</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={this.state.issues}
                    refreshing={this.state.refresh}
                    onRefresh={this.onRefresh}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ItemList issue
                            ownerAvatar={item.user.avatar_url}
                            name={item.title}
                            ownerName={item.user.login}
                            onSelectRepo={this.selectItem}
                            url={item.html_url} />
                    )} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 10,
        backgroundColor: '#DADADA'
    },
    buttons: {
        marginVertical: 10,
        marginHorizontal: 6,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#BDBABA'
    },
    button: {
    },
    buttonText: {
        fontSize: 18,
        color: '#000'
    }
})