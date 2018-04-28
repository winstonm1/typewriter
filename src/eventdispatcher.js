const dispatcherEvents = new WeakMap();


export default class EventDispatcher {

  on(type, listener) {
    getEventListeners(this, type, true).add(listener);
  }

  off(type, listener) {
    const events = getEventListeners(this, type);
    events && events.delete(listener);
  }

  once(type, listener) {
    function once(...args) {
      this.off(type, once);
      listener.apply(this, args);
    }
    this.on(type, once);
  }

  fire(type, ...args) {
    let uncanceled = true;
    const events = getEventListeners(this, type);
    if (events) events.forEach(listener => {
      uncanceled && listener.apply(this, args) !== false || (uncanceled = false);
    });
    return uncanceled;
  }
}


function getEventListeners(obj, type, autocreate) {
  let events = dispatcherEvents.get(obj);
  if (!events && autocreate) dispatcherEvents.set(obj, events = Object.create(null));
  return events && events[type] || autocreate && (events[type] = new Set());
}
