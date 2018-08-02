import {isomorphic} from '@isoreact/core';
import {interval, of as observableOf, from as observableFrom, concat} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import superagent from 'superagent';

import update from '../../util/update';
import ClockContext from './context';
import Clock from '.';

const time$ = observableFrom(superagent.get('http://localhost:3000/api/v1/time'))
    .pipe(
        map(({body}) => body),
        map(({hours, minutes, seconds}) => (hours * 3600) + (minutes * 60) + seconds),
        switchMap((seconds) => (
            update(
                seconds,
                interval(1000), (seconds) => seconds + 1,
            )
        ))
    );

const IsoClockNow = isomorphic({
    name: 'iso-clock-now',
    component: Clock,
    context: ClockContext,

    getData: (props, hydration) => (
        (
            process.server
                ? time$
                : concat(
                    observableOf(hydration ? hydration.seconds : null),
                    time$
                )
        )
            .pipe(
                map((seconds) => ({
                    state: seconds === null
                        ? {
                            isLoading: true,
                        }
                        : {
                            hours: Math.floor(seconds / 3600) % 24,
                            minutes: Math.floor(seconds / 60) % 60,
                            seconds: seconds % 60,
                            isLoading: false,
                        },
                    hydration: {
                        seconds,
                    },
                }))
            )
    ),
});

export default IsoClockNow;
