import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TextInput, Picker, Alert } from 'react-native';
import { List, ListItem, SearchBar, Header, FormValidationMessage, Button } from "react-native-elements";


export default class AdminOldOrderLook extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#5F5395', height: 40 },
        headerTitleStyle: { color: 'white', alignItems: 'center' }
    }

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.state = {
            loading: false,
            access_token : navigation.getParam('access_token', 'access_token'),
            item: navigation.getParam('item', null),
            errorMessage : null
        };

    }


    render() {
        var dateSplit = this.state.item.time_open.split(' ');
        var date = new Date(dateSplit[0] + "T" + dateSplit[1].split('.')[0] + "Z");
        date = date.toLocaleTimeString('en-GB');
        return (
            <View style = {styles.container}>
                <ListItem hideChevron containerStyle={{ backgroundColor: 'black', height: 40 }}/>
                <ListItem
                    title={this.state.item.currency_code}
                    titleStyle = {styles.textStyle}
                    subtitle= {"" + date}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem
                    title={this.state.item.buy_or_sell == 0 ? "BUY": "SELL"}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.item.price}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem
                    title={`Take Profit #1`}
                    titleStyle = {{color : "green"}}
                    rightTitle={"" + this.state.item.take_profit_one}
                    containerStyle = {{borderBottomWidth : 0, height : 35}}
                    hideChevron
                />
                <ListItem
                    title={`Take Profit #2`}
                    titleStyle = {{color : "green"}}
                    rightTitle={"" + this.state.item.take_profit_two}
                    containerStyle={{ borderBottomWidth : 0, height: 35}}
                    hideChevron
                />
                <ListItem
                    title={`Take Profit #3`}
                    titleStyle = {{color : "green"}}
                    rightTitle={"" + this.state.item.take_profit_three}
                    containerStyle={{ borderBottomWidth : 0, height: 35 }}
                    hideChevron
                />
                <ListItem
                    title={`Stop Loss`}
                    titleStyle = {{color : "red"}}
                    rightTitle={"" + this.state.item.stop_loss}
                    containerStyle={{ height: 35 }}
                    hideChevron
                />
                <View style = {styles.resContainer}>
                {this.state.value == 'news'? <Text style = {styles.successTitleStyle} > TAKE PROFIT </Text> : <Text style = {styles.failTitleStyle}> STOP LOSS </Text> }
                </View>
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: 'black'
    },
    resContainer: {
        flexGrow : 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
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
    buttonTP:{
        width:100,
        height:50,
        backgroundColor: 'green',
        borderRadius: 15,
    },
    buttonSL:{
        width:100,
        height:50,
        backgroundColor: 'red',
        borderRadius: 15,
    },
    successTitleStyle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: "green"
      },
    failTitleStyle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: "red"
    },
    buttonContainer:{
        paddingVertical: 10,
    },
    textStyle:{
        fontSize: 18,
        color: "#fff"
    },
});
