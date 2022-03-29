import React from 'react';
import { Container, Tipo, IconView, TipoText, ValorText } from './style';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native';

export default function HistoricoList({ data, deteleItem }) {
    return (
        <TouchableWithoutFeedback onLongPress={ () => deteleItem(data) }>
            <Container>
                <Tipo>
                    <IconView tipo={data.tipo}>
                        <Icon
                        name={ data.tipo === 'receita' ? 'arrow-up' : 'arrow-down' }
                        color="#FFF"
                        size={20}
                        />
                        <TipoText tipo={data.tipo}> { data.tipo }</TipoText>
                    </IconView>
                </Tipo>
                <ValorText>
                    R$ { data.valor } - {data.date}
                </ValorText>
            </Container>
        </TouchableWithoutFeedback>
    );
}