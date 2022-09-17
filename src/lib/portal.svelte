<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onDestroy, type SvelteComponentTyped } from 'svelte';
	import { renderPortal, unRenderPortal } from './store';
	import { nanoid } from 'nanoid';

	type Component = $$Generic<typeof SvelteComponentTyped<Record<string, any>>>;
	type Props = Component extends typeof SvelteComponentTyped<infer T extends Record<string, any>>
		? T
		: never;

	type $$Props = {
		'portal-id'?: string;
		'portal-name'?: string;
		this: Component;
	} & Props;

	const defaultPortalId = nanoid();

	let portalId: string;
	let portalName: string | undefined;
	let component: Component;
	let props: Omit<$$Props, 'portal-id' | 'portal-name' | 'this'>;

	let previousPortalId: string | undefined;
	let previousPortalName: string | undefined;

	$: {
		const {
			'portal-id': _portalId,
			'portal-name': _portalName,
			this: _component,
			..._props
		} = $$props as $$Props;

		portalId = _portalId || defaultPortalId;
		portalName = _portalName;
		component = _component;
		props = _props;
	}

	onDestroy(() => {
		unRenderPortal(portalId, portalName);
	});

	$: if (previousPortalId && (previousPortalId !== portalId || previousPortalName !== portalName))
		unRenderPortal(previousPortalId, previousPortalName);

	$: previousPortalId = portalId;
	$: portalName = portalName;

	$: renderPortal({ portalId, portalName, component, props });
</script>
