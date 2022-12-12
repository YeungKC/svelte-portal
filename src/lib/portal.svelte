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
		'portal-container-name'?: string;
		this: Component;
	} & Props;

	const defaultPortalId = nanoid();

	let portalId: string;
	let portalContainerName: string | undefined;
	let component: Component;
	let props: Omit<$$Props, 'portal-id' | 'portal-container-name' | 'this'>;

	let previousPortalId: string | undefined;
	let previousPortalContainerName: string | undefined;

	$: {
		const {
			'portal-id': _portalId,
			'portal-container-name': _portalContainerName,
			this: _component,
			..._props
		} = $$props as $$Props;

		portalId = _portalId || defaultPortalId;
		portalContainerName = _portalContainerName;
		component = _component;
		props = _props;
	}

	onDestroy(() => {
		unRenderPortal(portalId, portalContainerName);
	});

	$: if (
		previousPortalId &&
		(previousPortalId !== portalId || previousPortalContainerName !== portalContainerName)
	)
		unRenderPortal(previousPortalId, previousPortalContainerName);

	$: previousPortalId = portalId;
	$: portalContainerName = portalContainerName;

	$: renderPortal({ portalId, portalContainerName, component, props });
</script>
