import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Dimension, FontWeight } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addFavoriteNews, removeFavoriteNews } from '../redux/favoriteNewsSlice';

const NewsDetailPage = ({ navigation, route }) => {
  const { news } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Toggle the isFavorite state
    if (isFavorite) {
      dispatch(removeFavoriteNews(news));
    } else {
      dispatch(addFavoriteNews(news));
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: news.urlToImage }} />
      <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoriteClick}>
        <Icon name={isFavorite ? "plus-circle" : "plus"} size={24} color="white" />
      </TouchableOpacity>
    </View>
    <Text style={styles.title}>{news.title}</Text>
    <Text style={styles.description}>{news.description}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: Dimension.DIM1,
      backgroundColor: Colors.lightGrey,
      padding: Dimension.DIM5,
    },
    imageContainer: {
      width: Dimension.width,
      height: Dimension.height2,
    },
    image: {
      width: Dimension.width,
      height: '100%',
      resizeMode: 'cover',
    },
    favoriteIcon: {
      position: 'absolute',
      top: Dimension.DIM5,
      right: Dimension.DIM5,
    },
    title: {
      fontSize: Dimension.DIM9,
      fontWeight: FontWeight.bold,
      marginBottom: Dimension.DIM5,
    },
    description: {
      fontSize: Dimension.DIM7,
      fontWeight: FontWeight.normal,
    },
});

export default NewsDetailPage;