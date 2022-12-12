/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponentTyped } from 'svelte';
import { get, writable } from 'svelte/store';
import { mapTemplate } from './helper';

interface Portal<T extends Record<string, any>> {
	portalId: string;
	portalContainerName?: string;
	component: typeof SvelteComponentTyped<T>;
	props?: T;
}

const DEFAULT_PORTAL_NAME = Symbol('default');

const portalMapTemplate = mapTemplate(() => writable<Portal<any>[]>([]));

export const getPortal = (key: unknown) =>
	portalMapTemplate(key === undefined ? DEFAULT_PORTAL_NAME : key);

export const renderPortal = <T extends Record<string, any>>(portal: Portal<T>) => {
	const portalStore = getPortal(portal.portalContainerName);
	const $portals = [...get(portalStore)];

	const index = $portals.findIndex(({ portalId }) => portalId === portal.portalId);
	if (index === -1) $portals.push(portal);
	else $portals[index] = portal;

	portalStore.set([...$portals]);
};

export const unRenderPortal = (id: string, name: unknown) => {
	const portalStore = getPortal(name);
	const $portals = [...get(portalStore)];

	const index = $portals.findIndex(({ portalId }) => portalId === id);
	if (index === -1) return;

	$portals.splice(index, 1);
	portalStore.set([...$portals]);
};
