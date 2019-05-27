import React from 'react';
import styled from 'styled-components';
import {Connect} from '@isoreact/bacon1';

import Component2Context from './context';

const Section = styled.section`
    padding: 7px;
`;

const Component2 = () => (
    <Section>
        <h3>Message from Component2:</h3>
        <div>
            <Connect context={Component2Context}>
                {({message}) => message}
            </Connect>
        </div>
    </Section>
);

export default Component2;
