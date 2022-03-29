import React, { useState } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { Container, Header } from './style';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, onClose, onChange }) {
    const [dateNow, setDateNow] = useState(new Date(date));

    return (
        <Container>
            {
                Platform.OS === 'ios' && (
                    <Header>
                        <TouchableOpacity onPress={ onClose }>
                            <Text>Fechar</Text>
                        </TouchableOpacity>
                    </Header>
            )}
            <DateTimePicker
            value={dateNow}
            mode='datetime'
            display='default'
            style={{ backgroundColor: '#FFF' }}
            onChange={(event, date) => {
                const currentDate = date || dateNow;
                setDateNow(currentDate);
                onChange(currentDate);
            }}
            />
        </Container>
    );
}