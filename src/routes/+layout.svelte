<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Welcome to the bakery</title>
</svelte:head>

<ModeWatcher />

<svelte:boundary>
	{@render children()}

	{#snippet failed(error, reset)}
		oops! <Button onclick={reset}>try again</Button>
	{/snippet}
</svelte:boundary>

<Toaster />
