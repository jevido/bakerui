<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher, userPrefersMode } from 'mode-watcher';
	import { beforeNavigate, goto } from '$app/navigation';
	import { sdk, session } from '$lib/sdk';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();

	beforeNavigate((navigation) => {
		if (navigation.to?.route.id.startsWith('/(app)') && !session.token) {
			toast.warning('You must be logged in to access the app');
			goto('/login');
		}
	});

	onMount(() => {
		if (page.route.id.startsWith('/(app)') && !session.token) {
			console.debug(session);
			toast.warning('You must be logged in to access the app');

			goto('/login');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>BakerUI - The Bakery UI</title>
</svelte:head>

<ModeWatcher />

<svelte:boundary>
	{@render children()}

	{#snippet failed(error, reset)}
		{#if session.token === false}
			<p>
				You are not logged in. Please <Button
					onclick={reset}
					href="/login"
					variant="link"
					size="inline">log in</Button
				> to access this page.
			</p>
		{:else}
			<button onclick={reset}>oops! try again</button>
		{/if}
	{/snippet}
</svelte:boundary>

<Toaster />
