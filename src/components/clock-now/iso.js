import {isomorphic} from '@isoreact/bacon1';
import bacon from 'baconjs';
import superagent from 'superagent';

import ClockContext from './context';
import Clock from '.';

function getTime() {
    return bacon
        .fromPromise(superagent.get('http://localhost:3000/api/v1/time'))
        .map('.body')
        .map(({hours, minutes, seconds}) => (hours * 3600) + (minutes * 60) + seconds)
        .flatMapLatest((seconds) => bacon.update(
            seconds,
            [bacon.interval(1000)], (seconds) => seconds + 1
        ));
}

function getData(props, hydration) {
    const seconds$ = (
        process.server
            ? getTime()
            : bacon.concatAll(
                bacon.constant(hydration === undefined ? null : hydration.seconds),
                getTime()
            )
    );

    return seconds$
        .map((seconds) => ({
            state: seconds === null
                ? {
                    isLoading: true,
                }
                : {
                    isLoading: false,
                    hours: Math.floor(seconds / 3600) % 24,
                    minutes: Math.floor(seconds / 60) % 60,
                    seconds: seconds % 60,
                },
            hydration: {
                seconds,
            },
        }))
        .toProperty();
}

const IsoClockNow = isomorphic({
    name: 'iso-clock-now',
    component: Clock,
    context: ClockContext,
    getData,
});

export default IsoClockNow;
