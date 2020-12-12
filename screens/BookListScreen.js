import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardView from 'react-native-cardview';

export default class BookListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.route.params.title,
            category: this.props.route.params.category,
            booklist: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.state.title })
        this.LoadData();
    }

    renderItemView = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('BookProfile', { title: item.title, image: item.book_image, buyurl: item.amazon_product_url })}>
                <CardView style={{ margin: 5, backgroundColor: 'white' }}
                    cardElevation={0}
                    cardMaxElevation={0}
                    cornerRadius={10}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 2 }}>
                        <Image
                            style={{ width: 100, height: 150, margin: 5 }}
                            source={{ uri: item.book_image }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>{item.title}</Text>
                            <Text style={{ marginLeft: 10, color: '#a3a3a3' }}>{item.description}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 10 }}>
                                <Text>author : </Text>
                                <Text style={{ color: '#a3a3a3' }}>{item.author}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 10 }}>
                                <Text>publisher : </Text>
                                <Text style={{ color: '#a3a3a3' }}>{item.publisher}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 10, marginBottom: 10 }}>
                                <Text>contributor : </Text>
                                <Text style={{ color: '#a3a3a3', flex: 1 }}>{item.contributor}</Text>
                            </View>
                        </View>
                    </View>

                </CardView>
            </TouchableOpacity >
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                < View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#39F" />
                    <Text style={{ margin: 20 }}>Please wait</Text>
                </View >
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.booklist}
                    renderItem={this.renderItemView}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    LoadData() {
        fetch('https://api.nytimes.com/svc/books/v3/lists/current/' + this.state.category + '.json?api-key=aQvbtdqQLW8fekiIDtJDcy7yseN9rgqs', {
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

            json.results.books.forEach(element => {
                list.push({
                    title: element.title,
                    description: element.description,
                    author: element.author,
                    publisher: element.publisher,
                    contributor: element.contributor,
                    book_image: element.book_image,
                    amazon_product_url: element.amazon_product_url
                })
            });

            this.setState({ booklist: list, isLoading: false });
        })
    }
}