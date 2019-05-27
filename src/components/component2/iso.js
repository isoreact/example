import {isomorphic} from '@isoreact/bacon1';
import bacon from 'baconjs';

import Component2Context from './context';
import Component2 from '.';

function getData() {
    return bacon.combineTemplate({
        state: {
            message: bacon.constant('Just another component taking up space'),
        },
    });
}

const IsoComponent2 = isomorphic({
    name: 'iso-component-2',
    component: Component2,
    context: Component2Context,
    getData,
});

export default IsoComponent2;
