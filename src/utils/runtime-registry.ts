type RuntimeRegistryState = {
  values: Map<string, unknown>;
};

const REGISTRY_KEY = '__runtimeRegistry__';

function getState() {
  const registryWindow = window as typeof window & {
    [REGISTRY_KEY]?: RuntimeRegistryState;
  };

  if (!registryWindow[REGISTRY_KEY]) {
    registryWindow[REGISTRY_KEY] = {
      values: new Map<string, unknown>(),
    };
  }

  return registryWindow[REGISTRY_KEY];
}

export function runOnce(key: string, callback: () => void) {
  const state = getState();

  if (state.values.has(key)) return false;

  state.values.set(key, true);
  callback();
  return true;
}

export function getOrCreateValue<T>(key: string, createValue: () => T) {
  const state = getState();

  if (!state.values.has(key)) {
    state.values.set(key, createValue());
  }

  return state.values.get(key) as T;
}

export function getValue<T>(key: string) {
  const state = getState();
  return state.values.get(key) as T | undefined;
}

export function setValue<T>(key: string, value: T) {
  const state = getState();
  state.values.set(key, value);
  return value;
}
