import React from 'react';
import { Container, Tipo, IconView, TipoText, ValorText } from './style';
import Icon from 'react-native-vector-icons/Feather';

export default function HistoricoList({ data }) {
    return (
        <Container>
            <Tipo>
                <IconView tipo={data.tipo}>
                    <Icon
                    name={ data.tipo === 'receita' ? 'arrow-up' : 'arrow-down' }
                    color="#FFF"
                    size={20}
                    />
                    <TipoText tipo={data.tipo}> { data.tipo } </TipoText>
                </IconView>
            </Tipo>
            <ValorText>
                R$ { data.valor }
            </ValorText>
        </Container>
    );
}