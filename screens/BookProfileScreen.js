import React from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardView from 'react-native-cardview';

export default class BookProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.route.params.title,
            image: this.props.route.params.image,
            buyurl: this.props.route.params.buyurl,
            booktitle: "No Information",
            summary: "No Information",
            author: "No Information",
            byline: "No Information",
            publication_dt: "No Information"
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.state.title })
        this.LoadData();
    }

    render() {
        return (
            <View style={{ flex: 0.7 }}>
                <View style={{ flex: 1, flexDirection: 'row', margin: 2 }}>
                    <Image
                        style={{ width: 150, height: 200, margin: 5 }}
                        source={{ uri: this.state.image }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>{this.state.title}</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Text>author : </Text>
                            <Text style={{ color: '#a3a3a3' }}>{this.state.author}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Text>byline : </Text>
                            <Text style={{ color: '#a3a3a3' }}>{this.state.byline}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 10 }}>
                            <Text>publication date : </Text>
                            <Text style={{ color: '#a3a3a3' }}>{this.state.publication_dt}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { Linking.openURL(this.state.buyurl) }}>
                            <CardView style={{ margin: 5, backgroundColor: '#a83232', width: 140, marginTop: 40, marginLeft: 10 }}
                                cardElevation={0}
                                cardMaxElevation={0}
                                cornerRadius={10}>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 10, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', flex: 1, marginTop: 6, color: 'white' }}>Buy </Text>
                                    <Image style={{ width: 30, height: 30, marginTop: 7, marginRight: 30 }} source={require('../images/carts.png')} />
                                </View>
                            </CardView>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Text style={{ fontSize: 20, margin: 10 }}>Summary</Text>
                    <Text style={{margin: 10}}>{this.state.summary}</Text>
                </View>
            </View>
        )
    }

    LoadData() {
        fetch('https://api.nytimes.com/svc/books/v3/reviews.json?title=' + this.state.title + '&api-key=aQvbtdqQLW8fekiIDtJDcy7yseN9rgqs', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            timeout: 300
        }).then(res => {
            return res.json();
        }).then(json => {

            if (json.num_results == 0) {
                
            } else {
                this.setState({
                    booktitle: json.results[0].book_title,
                    summary: json.results[0].summary,
                    author: json.results[0].book_author,
                    byline: json.results[0].byline,
                    publication_dt: json.results[0].publication_dt
                });
            }


        })
    }

}

const styles = StyleSheet.create({

})