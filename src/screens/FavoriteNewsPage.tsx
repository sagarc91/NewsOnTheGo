import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Colors, Dimension, FontWeight } from '../constants'

const FavoriteNewsPage = () => {
  const favoriteNews = useSelector(state => state.favoriteNews);

  if (!favoriteNews || favoriteNews.length === 0) {
    return (
      <View style={styles.noData}>
        <Text style={styles.title}>No Data Found</Text>
        <Text>Please add a news to favourite so that it will appears here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteNews}
        renderItem={({ item }) => (
          <View style={styles.innerContainer}>
            <Image style={styles.image} source={{ uri: item?.urlToImage }} />
            <View style={{ padding: 10 }}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.description}>{item?.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Dimension.DIM5,
    padding: Dimension.DIM5,
    backgroundColor: Colors.lightGrey,
    borderRadius: Dimension.DIM5,
  },
  image: {
    width: Dimension.width,
    height: Dimension.height2,
    marginBottom: Dimension.DIM5,
  },
  title: {
    fontSize: Dimension.DIM7,
    fontWeight: FontWeight.bold,
    marginBottom: Dimension.DIM5,
  },
  description: {
    fontSize: Dimension.DIM6,
  },
  innerContainer: { 
    flex: Dimension.DIM2,
    backgroundColor: Colors.white,
    margin: Dimension.DIM5,
    borderRadius: Dimension.DIM5,
    overflow: 'hidden',
  },
  noData: { flex: Dimension.DIM2, justifyContent: 'center', alignItems: 'center' }
});

export default FavoriteNewsPage;