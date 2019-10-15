/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , { useEffect , useState } from 'react'
import {
  View,
  Button,
  TouchableOpacity
} from "react-native";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";

import {
  LoginManager
} from "react-native-fbsdk";
import {
  firebase
} from "@react-native-firebase/auth";

import FeatherIcon from 'react-native-vector-icons/FontAwesome'


import styled from 'styled-components';

const Wrapper = styled.View`
  margin-top: 20px;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const StyledLogoImage = styled.Image`
  width: 100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  flex: 1;
`;


const StyledButtonWrapper = styled.View`
    flex: 1;

`

const StyledButton= styled(TouchableOpacity)`
flex-direction: row;
width: 70%;
background-color: #4267b2;
margin-left: auto;
margin-right: auto;
height: 40px;
`

const StyledFeatherIcon = styled(FeatherIcon)`
    margin: auto;
    text-align: center;
    font-size: 24px;
    flex: 1;
    color: #d1d1d1;
`

const StyledText = styled.Text`
    flex: 5;
    text-align: center;
    padding: 8px 5px 10px 0px;
    letter-spacing: 1px;
    font-weight: 800;
    font-size: 16px;
    color: #d1d1d1;
`



const Login =  (props) => {
  const onLoginFacebookHandle = async ()=>{
      // Login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email"
      ]);

      console.log("check result", result);

      if (result.isCancelled) {
        throw new Error("User cancelled the login process");
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error("Something went wrong obtaining access token");
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      await firebase.auth().signInWithCredential(credential);
  }

  return (
    <Wrapper>
        <StyledLogoImage
            resizeMode={"contain"}
            source={{ uri: 'https://external.fhan5-7.fna.fbcdn.net/safe_image.php?d=AQDMvQfI0WkUxIgV&w=540&h=282&url=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F29b9a8_05dd638ec28a4b26826c557f0bc92d7f%257Emv2.jpg&cfs=1&upscale=1&fallback=news_d_placeholder_publisher&_nc_hash=AQATC3dBf1z-fyYw' }}
        />
        <StyledButtonWrapper>
            <StyledButton onPress={onLoginFacebookHandle}>
                <StyledFeatherIcon name={'facebook-f'}/>
                <StyledText>Login With Facebook</StyledText>
            </StyledButton>
        </StyledButtonWrapper>

    </Wrapper>
  );
};


export default Login;