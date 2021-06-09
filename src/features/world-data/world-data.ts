const version = 1;
const STORAGE_KEY_PREFIX = `__FIO_v${version}_`;

export const worldData = {
  planets: [] as ShortPlanet[],
}

const urls: Record<keyof typeof worldData, string> = {
  planets: "/planet/allplanets",
}

export async function loadWorldData() {
  await Promise.all(Object.entries(urls).map(([key, url]) => ensureData(key as keyof typeof worldData, url)))
}

async function ensureData<K extends keyof typeof worldData>(name: K, url: string): Promise<void> {
  let data = loadState<typeof worldData[K]>(name)
  if (!data) {
    data = await loadData<typeof worldData[K]>(url)
    saveState(name, data)
  }
  worldData[name] = data
}

export interface ShortPlanet {
  PlanetNaturalId: string;
  PlanetName: string;
}

async function loadData<T>(url: string): Promise<T> {
  const response = await fetch("https://rest.fnar.net" + url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await response.json()
}

function saveState<T = object>(name: string, storeState: T): boolean {
  if (!localStorage) {
    return false;
  }

  try {
    const serializedState = JSON.stringify(storeState);
    localStorage.setItem(STORAGE_KEY_PREFIX + name, serializedState);
    return true;
  } catch (error) {
    // ignore read errors
    console.error('store serialization failed');
    return false;
  }
}

function loadState<T = object>(name: string): T | undefined {
  if (!localStorage) {
    return;
  }

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY_PREFIX + name);
    if (serializedState == null) {
      return;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // ignore write errors
    console.error('store deserialization failed', name, error);
  }
}
