import { Box } from 'remini';
export {
  observe, useBox, useBoxes, useJsx
};

declare const observe: any;
declare const useBox: <P>(box: Box<P>) => P;
declare const useBoxes: {
  <A>(boxes: [Box<A>]): [A];
  <A,B>(boxes: [Box<A>,Box<B>]): [A,B];
  <A,B,C>(boxes: [Box<A>,Box<B>,Box<C>]): [A,B,C];
  <A,B,C,D>(boxes: [Box<A>,Box<B>,Box<C>,Box<D>]): [A,B,C,D];
  <A,B,C,D,E>(boxes: [Box<A>,Box<B>,Box<C>,Box<D>,Box<E>]): [A,B,C,D,E];
  <A,B,C,D,E,F>(boxes: [Box<A>,Box<B>,Box<C>,Box<D>,Box<E>,Box<F>]): [A,B,C,D,E,F];
}
declare function useJsx(...args: any[]): any;