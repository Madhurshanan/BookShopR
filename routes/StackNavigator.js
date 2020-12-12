import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookCategoriesScreen from '../screens/BookCategoriesScreen ';
import BookListScreen from '../screens/BookListScreen';
import BookProfileScreen from '../screens/BookProfileScreen';

const Stack = createStackNavigator();

const BookStackNavigation = () => {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="BookCategories"
                component={BookCategoriesScreen}
                options={({ route }) => ({ title: route.params.name }),
                {
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#39F'
                }} />

            <Stack.Screen
                name="BookList"
                component={BookListScreen}
                options={({ route }) => ({ title: route.params.name }),
                {
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#39F'
                }} />

            <Stack.Screen
                name="BookProfile"
                component={BookProfileScreen}
                options={({ route }) => ({ title: route.params.name }),
                {
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#39F'
                }} />

        </Stack.Navigator>
    )

}
export default BookStackNavigation;