<script lang="ts">
	export let timestamp: number;
	export let onClose: () => void;
</script>

<overlay
	on:click={() => {
		onClose();
	}}
>
	<content>
		<h1>This is a portal</h1>
		<h2>
			{timestamp}
		</h2>
	</content>
</overlay>

<style>
	overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #33333333;
	}
	content {
		background-color: white;
		border-radius: 12px;
		padding: 12px;
	}
</style>
