import {isomorphic} from '@isoreact/core';
import {of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';

import Component2 from '.';
import Component2Context from './context';

const IsoComponent2 = isomorphic({
    name: 'iso-component-2',
    component: Component2,
    context: Component2Context,
    getData: (props, hydration) => {
        return observableOf('Just another component taking up space')
            .pipe(
                map((message) => ({
                    state: {
                        message,
                    },
                    hydration: {},
                })),
            );
    },
});

export default IsoComponent2;
