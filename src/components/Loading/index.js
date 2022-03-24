import Reat from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loading(){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color='#00b94a' size='large' />
        </View>
    );
}