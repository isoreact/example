import {isomorphic} from '@isoreact/core';
import {of as observableOf, interval} from 'rxjs';
import {map, filter} from 'rxjs/operators';

import update from '../../util/update';

import Clock from '.';
import ClockContext from './context';

const IsoClock = isomorphic({
    name: 'iso-clock',
    component: Clock,
    context: ClockContext,
    getData: ({start}, hydration) => (
        hydration
            ? update(
                hydration.seconds,
                interval(1000), (seconds) => seconds + 1,
            )
                .pipe(
                    filter(isFinite),
                    map((seconds) => ({
                        hours: Math.floor(seconds / 3600) % 24,
                        minutes: Math.floor(seconds / 60) % 60,
                        seconds: seconds % 60,
                    })),
                    map(({hours, minutes, seconds}) => ({
                        state: {
                            hours,
                            minutes,
                            seconds,
                        },
                        hydration: {},
                    })),
                )
            : observableOf(start || {
                hours: Math.floor(Math.random() * 24),
                minutes: Math.floor(Math.random() * 60),
                seconds: Math.floor(Math.random() * 60),
            })
                .pipe(
                    map(({hours, minutes, seconds}) => ({
                        state: {
                            hours,
                            minutes,
                            seconds,
                        },
                        hydration: {
                            seconds: (hours * 3600) + (minutes * 60) + seconds,
                        }
                    })),
                )
    ),
});

export default IsoClock;
