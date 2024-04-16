import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePicture } from '../redux/profileSlice';
import { Dimension } from '../constants';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profilePicture = useSelector(state => state?.profile?.picture);

  const handleEditButtonPress = async () => {
    const options = {
      noData: true,
    };
  
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, response => {
          if (response.assets && response.assets[0].uri) {
            const picture = response.assets[0].uri;
            dispatch(setProfilePicture(picture));
          }
        });
      }
    } else {
      check(PERMISSIONS.IOS.CAMERA).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.GRANTED:
            launchCamera(options, response => {
              if (response.assets && response.assets[0].uri) {
                setProfilePicture(response.assets[0].uri);
              }
            });
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <Icon name="user" size={100} color="#808080" style={styles.image}/>
        )}
        <TouchableOpacity style={styles.editIcon} onPress={handleEditButtonPress}>
          <Icon name="pencil" size={30} color="#808080" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Sagar</Text>
      <Text style={styles.text}>sagarchavan77@gmail.com</Text>
      <Text style={styles.text}>9834445599</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: Dimension.DIM2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: Dimension.DIM1,
    top: Dimension.DIM1,
  },
  text: {
    fontSize: Dimension.DIM7,
    color: '#333',
    marginTop: Dimension.DIM1,
  },
});

export default ProfilePage;