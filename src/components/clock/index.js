import React from 'react';
import styled from 'styled-components';
import {Connect} from '@isoreact/bacon1';
import isEqual from 'lodash/isEqual';

import ClockContext from './context';

const StyledClock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid red;
    border-radius: 5px;
    background-color: #333;
    padding: 12px;
    width: 250px;
    color: tomato;
    font-size: 32px;
`;

const Clock = () => (
    <StyledClock>
        <Connect
            context={ClockContext}
            isEqual={isEqual} // this is optional
        >
            {({hours, minutes, seconds}) => [
                hours,
                minutes,
                seconds,
            ]
                .map((part) => part.toString().padStart(2, '0'))
                .join(':')
            }
        </Connect>
    </StyledClock>
);

export default Clock;
