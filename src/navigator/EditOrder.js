import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TextInput, Picker } from 'react-native';
import { List, ListItem, SearchBar, Header, FormValidationMessage, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import {GetRequest} from '../helper/request_helper';


export default class CreateOrder extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#5F5395', height: 40 },
        headerTitleStyle: { color: 'white', alignItems: 'center' },
        title: "Chỉnh sửa lệnh",
    }

    constructor(props) {
        super(props);
    
        const { navigation } = this.props;
        const item = navigation.getParam('item', null)
        this.state = {
            access_token : navigation.getParam('access_token', 'access_token'),
            item: item,
            loading: false,
            error: null,
            currency_code: item.currency_code,
            buy_or_sell: item.buy_or_sell,
            price: item.price,
            take_profit_one: item.take_profit_one,
            take_profit_two: item.take_profit_two,
            take_profit_three: item.take_profit_three,
            stop_loss: item.stop_loss,
            errorMessage: null,
            pickBuy: "Mua"
        };

        this._editOrder= this._editOrder.bind(this);
    }  
    
    _editOrder() {
        const currency_code = this.state.currency_code;
        const buy_or_sell = Number(this.state.buy_or_sell);
        const price = Number(this.state.price);
        const take_profit_one = Number(this.state.take_profit_one);
        const take_profit_two = Number(this.state.take_profit_two);
        const take_profit_three = Number(this.state.take_profit_three);
        const stop_loss = Number(this.state.stop_loss);
        const itemId = this.state.item.id;

        axios.put(`https://tinhieu-backend.herokuapp.com/admin/notification/` + itemId, {
            currency_code: currency_code,
            buy_or_sell: buy_or_sell,
            price: price,
            take_profit_one: take_profit_one,
            take_profit_two: take_profit_two,
            take_profit_three: take_profit_three,
            stop_loss: stop_loss
        },
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({errorMessage: "Đặt lệnh thành công"})
            const { navigation } = this.props;
            navigation.goBack();
        }).catch(error =>{
            console.log(error.response);
            this.setState({errorMessage: "Đặt lệnh không thành công"})
            console.log(this.access_token);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView scrollEnabled showsVerticalScrollIndicator = {false}>
                    <Text style = {styles.textStyle}> Mã Tiền Tệ </Text>
                    <TextInput 
                        defaultValue = {this.state.item.currency_code}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        autoCapitalize = "characters"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ currency_code : text})}
                    />
                    <Text style = {styles.textStyle}> Chọn Mua hoặc Bán (1 cho Mua hoặc 2 cho Bán)</Text>
                    {/* <Picker
                        selectedValue={this.state.item.buy_or_sell == 0? "Mua" : "Bán"}
                        style={{ height: 50, width: 100, 
                            backgroundColor: '#5F5395',
                            borderRadius: 10,
                            paddingHorizontal: 16,
                            color: '#ffffff',
                            marginVertical: 10}}
                        onValueChange={(itemValue, itemIndex) => this.setState({buy_or_sell: itemValue, pickBuy: itemValue})}>
                        <Picker.Item label="Mua" value= "0" />
                        <Picker.Item label="Bán" value= "1" />
                    </Picker> */}
                    <TextInput 
                        defaultValue = {this.state.item.buy_or_sell + 1 + ""}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ price : text})}
                    />
                    <Text style = {styles.textStyle}> Giá Mua hoặc Giá Bán </Text>
                    <TextInput 
                        defaultValue = {"" + this.state.item.price}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ price : text})}
                    />
                    <Text style = {styles.textStyle}> Take Profit #1 </Text>
                    <TextInput 
                        defaultValue = {"" + this.state.item.take_profit_one}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ take_profit_one : text})}
                    />
                    <Text style = {styles.textStyle}> Take Profit #2 </Text>
                    <TextInput 
                        defaultValue = {"" + this.state.item.take_profit_two}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ take_profit_two : text})}

                    />
                    <Text style = {styles.textStyle}> Take Profit #3 </Text>
                    <TextInput 
                        defaultValue = {"" + this.state.item.take_profit_three}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ take_profit_three : text})}

                    />
                    <Text style = {styles.textStyle}> Stop Loss </Text>
                    <TextInput 
                        defaultValue = {"" + this.state.item.stop_loss}
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ stop_loss : text})}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>
                    <Button 
                        buttonStyle = {styles.button}
                        title="Chỉnh sửa lệnh"
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {this._editOrder}
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4C9BCF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox:{
        width:350,
        height:50,
        backgroundColor: '#5F5395',
        borderRadius: 10,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button:{
        width:300,
        height:50,
        backgroundColor: '#5F5395',
        borderRadius: 22,
    },
    buttonContainer:{
        paddingVertical: 10
    },
    textStyle:{
        fontSize: 18,
        color: "#fff"
    },
});
