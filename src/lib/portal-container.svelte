<script lang="ts">
	import { getPortal } from './store';

	export let name: string | undefined = undefined;

	$: portalStore = getPortal(name);
</script>

{#each $portalStore as { portalId, portalName, component, props }}
	<svelte:component this={component} {...props} />
{/each}
