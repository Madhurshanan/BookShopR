import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardView from 'react-native-cardview';

export default class BookCategoriesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categorylist: []
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: "NYT Best Sellers Books Category" })
        this.LoadData();
    }

    renderItemView = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('BookList', { title: item.display_name, category: item.list_name_encoded })}>
                <CardView style={{ margin: 10, backgroundColor: 'white' }}
                    cardElevation={0}
                    cardMaxElevation={0}
                    cornerRadius={10}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 2 }}>
                        <View style={{
                            margin: 5,
                            marginTop: 20,
                            marginLeft: 10,
                            width: 15,
                            height: 15,
                            borderRadius: 100 / 2,
                            backgroundColor: '#39F'
                        }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>{item.display_name}</Text>
                            <Text style={{ marginLeft: 10, color: '#a3a3a3' }}>{item.list_name_encoded}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 10 }}>
                                <Text>Oldest publish date : </Text>
                                <Text style={{ color: '#a3a3a3' }}>{item.newest_published_date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 10, marginBottom: 10 }}>
                                <Text>Newest publish date : </Text>
                                <Text style={{ color: '#a3a3a3' }}>{item.newest_published_date}</Text>
                            </View>
                        </View>
                    </View>

                </CardView>
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.categorylist}
                    renderItem={this.renderItemView}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    LoadData() {
        fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=aQvbtdqQLW8fekiIDtJDcy7yseN9rgqs', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            timeout: 300
        }).then(res => {
            return res.json();
        }).then(json => {

            const list = [];

            json.results.forEach(element => {
                list.push({ display_name: element.display_name, list_name_encoded: element.list_name_encoded, oldest_published_date: element.oldest_published_date, newest_published_date: element.newest_published_date })
            });

            this.setState({ categorylist: list });
        })
    }

}

const styles = StyleSheet.create({
})