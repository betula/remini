const { expr } = require('reactive-box');
const { on, read, key_remini } = require('remini');


const key_function = 'function';
const key_nomemo = 'nomemo';

//
// Bindings factory
//

module.exports = (useReducer, useEffect, useRef, useMemo, memo) => {

  let context_is_observe;
  let observe_no_memo_flag;

  const useForceUpdate = () => (
    useReducer(() => [], [])[1]
  );

  const observe = ((target) => {
    function fn() {
      const force_update = useForceUpdate();
      const ref = useRef();
      if (!ref.current) ref.current = expr(target, force_update);
      useEffect(() => ref.current[1], []);

      const stack = context_is_observe;
      context_is_observe = 1;
      try {
        return ref.current[0].apply(this, arguments);
      } finally {
        context_is_observe = stack;
      }
    }
    return (observe_no_memo_flag || !memo)
      ? ((observe_no_memo_flag = 0), fn)
      : memo(fn)
  });

  if (memo) {
    observe[key_nomemo] = (target) => (
      (observe_no_memo_flag = 1),
      observe(target)
    );
  }

  const useBox = (target, deps) => {
    deps || (deps = []);
    const force_update = context_is_observe || useForceUpdate();
    const h = useMemo(() => {
      if (!target) return [target, () => {}];
      if (target[key_remini] && target[key_remini][0]) target = target[key_remini][0];

      if (typeof target === key_function) {
        if (context_is_observe) {
          return [target, 0, 1];
        } else {
          const stop = on(target, force_update);
          return [target, () => stop, 1];
        }
      } else {
        return [target, () => {}];
      }
    }, deps);

    context_is_observe || useEffect(h[1], [h]);
    return h[2] ? h[0]() : h[0];
  };

  const useBoxes = (targets, deps) => {
    return useBox(() => {
      let ret = Array.isArray(targets) ? [] : {};
      Object.keys(targets).forEach(key => {
        ret[key] = read(targets[key])
      });
      return ret;
    }, deps);
  };


  return {
    observe,
    useBox,
    useBoxes,
  }
}
