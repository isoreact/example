import {Observable, Subscription} from 'rxjs/index';

// Similar to Bacon.update, but only deals with one observable at a time
const update = (initialValue, ...patterns) => (
    Observable.create((observer) => {
        const streams = patterns.filter((_, i) => i % 2 === 0);
        const callbacks = patterns.filter((_, i) => i % 2);
        let value = initialValue;
        const subscription = new Subscription();

        streams.forEach((_, i) => void subscription.add(streams[i].subscribe((v) => {
            value = callbacks[i](value, v);
            observer.next(value);
        })));

        return () => subscription.unsubscribe();
    })
);

export default update;
