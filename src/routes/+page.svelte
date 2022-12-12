<script lang="ts">
	import { onDestroy } from 'svelte';
	import Portal from '$lib/portal.svelte';
	import Example from './_portal.svelte';
	import { browser } from '$app/environment';

	let timestamp = new Date().valueOf();

	const timer = setInterval(() => {
		timestamp = new Date().valueOf();
	}, 1000);

	onDestroy(() => {
		clearInterval(timer);
	});

	let opened = false;
</script>

<h1>This is a page</h1>
{#if browser}
	<h2>{timestamp}</h2>
{/if}

<button on:click={() => (opened = true)}> Open portal </button>

{#if opened}
	<Portal this={Example} {timestamp} onClose={() => (opened = false)} />
{/if}
