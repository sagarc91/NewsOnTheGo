import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native'
import { fetchNews } from '../api'
import { News } from '../types/news'
import { Colors, Dimension, FontWeight } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import ErrorPage from './ErrorPage';

const windowWidth = Dimensions.get('window').width

const NewsListPage = ({ navigation }) => {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchNews()
            .then(data => {
                console.log(`data:::: ${data.length}`);
                if (data.length == 0) {
                    throw new Error('No Internet Connection');
                } else {
                    setError(""); // Clear any previous error
                    setNewsData(data.articles);
                }
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const renderNewsItem = ({ item }: { item: News }) => (
        <TouchableOpacity onPress={() => handleNewsSelect(item)}>
            <View style={styles.newsItem}>
                <Image style={styles.thumbnail} source={{ uri: item.urlToImage }} />
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const handleNewsSelect = (news) => {
        navigation.navigate('NewsDetailPage', { news: news });
      }


    return (
        <SafeAreaView style={styles.container}>
            {error ? <ErrorPage errorMessage={error} /> : <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')} style={{ marginRight: 20 }}>
                        <Icon name="user" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FavoriteNewsPage')}>
                        <Icon name="heart" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={newsData}
                    renderItem={renderNewsItem}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: Dimension.DIM2,
        backgroundColor: Colors.lightGrey
    },
    title: {
        fontSize: Dimension.DIM9,
        fontWeight: FontWeight.bold,
        marginBottom: Dimension.DIM5,
    },
    newsItem: {
        flex: Dimension.DIM2,
        backgroundColor: Colors.white,
        margin: Dimension.DIM5,
        borderRadius: Dimension.DIM5,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                    height: 1,
                    width: 0,
                },
            },
            android: {
                elevation: 2,
            },
        }),
    },
    thumbnail: {
        width: Dimension.width,
        height: Dimension.height1,
        resizeMode: 'cover',
        borderTopLeftRadius: Dimension.DIM5,
        borderTopRightRadius: Dimension.DIM5,
    },
    description: {
        fontSize: Dimension.DIM7,
        fontWeight: FontWeight.normal,
    },
    flatListContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: Dimension.DIM5 / 2,
    },
})

export default NewsListPage;