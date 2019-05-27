import {isomorphic} from '@isoreact/bacon1';
import bacon from 'baconjs';

import ClockContext from './context';
import Clock from '.';

function getData({start}, hydration) {
    const stream$ = hydration === undefined
        ? bacon.constant(start || {
            hours: Math.floor(Math.random() * 24),
            minutes: Math.floor(Math.random() * 60),
            seconds: Math.floor(Math.random() * 60),
        })
        : bacon
            .update(
                hydration.seconds,
                [bacon.interval(1000)], (seconds) => seconds + 1
            )
            .filter(isFinite)
            .map((seconds) => ({
                hours: Math.floor(seconds / 3600) % 24,
                minutes: Math.floor(seconds / 60) % 60,
                seconds: seconds % 60,
            }));

    return bacon.combineTemplate({
        state: {
            hours: stream$.map('.hours'),
            minutes: stream$.map('.minutes'),
            seconds: stream$.map('.seconds'),
        },
        hydration: hydration ? {} : {
            seconds: stream$.map(({hours, minutes, seconds}) => (hours * 3600) + (minutes * 60) + seconds),
        },
    });
}

const IsoClock = isomorphic({
    name: 'iso-clock',
    component: Clock,
    context: ClockContext,
    getData,
});

export default IsoClock;
