import {hydrate} from '@isoreact/core';

import IsoClock from '../components/clock/iso';
import IsoClockNow from '../components/clock-now/iso';
import IsoComponent2 from '../components/component2/iso';

/* eslint-disable no-console */

console.log('Hydrating all instances of IsoClock...'); // eslint-disable-line no-console
hydrate(IsoClock);

console.log('Hydrating all instances of IsoClockNow...'); // eslint-disable-line no-console
hydrate(IsoClockNow);

console.log('Hydrating all instances of IsoComponent2...'); // eslint-disable-line no-console
hydrate(IsoComponent2);

console.log('Hydration complete');
