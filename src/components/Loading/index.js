import Reat from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loading(){
    return(
        <View>
            <ActivityIndicator color={'#00b94a'} size={ 50 } />
        </View>
    );
}