import { Observable, Subject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

console.clear();

const obs = new Observable<number>((observer) => {
  let counter = 0;
  const counterListener = () => {
    counter++;
    if (counter === 5) {
      clearInterval(myInterval);
    }
    console.log('observable counter emittálás', counter);
    observer.next(counter);
  };
  const myInterval = setInterval(counterListener, 500);
}).pipe(
  map((e) => {
    if (e === 5) {
      throw new Error('elértük az 5-öt');
    } else {
      return e + 2;
    }
  })
);

const sub = new Subject<number>();

obs.subscribe(sub);

const subscription = sub.subscribe(
  (res) => {
    console.log('subscribe emitt', res);
  },
  (err) => {
    console.error(err);
    subscription.unsubscribe();
  }
);

const subscription2 = sub.pipe(filter((e) => !(e % 2 === 0))).subscribe(
  (res) => {
    console.log('subscribe páratlan', res);
  },
  (err) => {
    subscription2.unsubscribe();
  }
);
