import React from 'react';
import ReactDOM from 'react-dom';
import {hydrate} from '@isoreact/bacon1';

import IsoClock from '../components/clock/iso';
import IsoClockNow from '../components/clock-now/iso';
import IsoComponent2 from '../components/component2/iso';

/* eslint-disable no-console */

console.log('Hydrating all instances of IsoClock...');
hydrate(IsoClock, {warnIfNotFound: true, warnIfAlreadyHydrated: true});

console.log('Hydrating all instances of IsoClockNow...');
hydrate(IsoClockNow, {warnIfNotFound: true, warnIfAlreadyHydrated: true});

console.log('Hydrating all instances of IsoComponent2...');
hydrate(IsoComponent2, {warnIfNotFound: true, warnIfAlreadyHydrated: true});

console.log('Hydration complete');

ReactDOM.render((
    <IsoClockNow />
), document.getElementById('isoClockNowClientOnly'));
