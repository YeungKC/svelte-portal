import type { Readable } from 'svelte/store';

export const mapTemplate = <Key, Store extends Readable<unknown> = never>(
	build: (key: Key) => Store
) => {
	const cache = new Map<Key, Store>();
	const template = (key: Key) => {
		const k = [...cache.keys()].find((k) => k === key);
		if (k === undefined) {
			const store = build(key);
			cache.set(key, store);
			return store;
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return cache.get(k)!;
	};

	return template;
};
