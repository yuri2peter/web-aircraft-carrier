import { changeStore } from '..';

export function setFoo() {
  changeStore((d) => {
    d.foo = 'bar';
  });
}
