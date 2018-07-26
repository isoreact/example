import {isomorphic} from '@isoreact/core';
import {of as observableOf, interval, concat} from 'rxjs';
import {shareReplay, map, filter, startWith} from 'rxjs/operators';

import update from '../../util/update';

import Clock from '.';
import ClockContext from './context';

const IsoClock = isomorphic({
    name: 'iso-component-1',
    component: Clock,
    context: ClockContext,
    getData: ({startFromSeconds}, hydration) => (
        hydration
            ? concat(
                observableOf(hydration.seconds),
                update(
                    hydration.seconds,
                    interval(1000), (seconds) => seconds + 1,
                )
            )
                .pipe(
                    filter(isFinite),
                    map((seconds) => ({
                        props: {
                            seconds,
                        },
                        hydration: {},
                    })),
                    startWith(hydration.seconds),
                    shareReplay(1),
                )
            : observableOf(isFinite(startFromSeconds) ? startFromSeconds : Math.floor(Math.random() * 1000))
                .pipe(
                    map((seconds) => ({
                        props: {
                            seconds,
                        },
                        hydration: {
                            seconds,
                        }
                    })),
                    shareReplay(1),
                )
    ),
    loadingProp: 'isLoading',
});

export default IsoClock;
