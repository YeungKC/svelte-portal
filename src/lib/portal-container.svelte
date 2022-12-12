<script lang="ts">
	import { getPortal } from './store';

	export let name: string | undefined = undefined;

	$: portalStore = getPortal(name);
</script>

{#each $portalStore as { portalId, component, props } (portalId)}
	<svelte:component this={component} {...props} />
{/each}
