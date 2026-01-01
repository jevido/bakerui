<script>
	import { onMount } from 'svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { session } from '$lib/sdk';
	import AppContainer from './app-container.svelte';

	let { children } = $props();

	beforeNavigate((navigation) => {
		if (navigation.to?.route.id.startsWith('/(app)') && !session.token) {
			toast.warning('You must be logged in to access the app');
			goto('/login');
		}
	});

	onMount(() => {
		if (!session.token) {
			toast.warning('You must be logged in to access the app');

			goto('/login');
		}
	});
</script>

<svelte:boundary>
	<AppContainer />

	{#snippet failed(error, reset)}
		{error.message}
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
			oops! <Button onclick={reset}>try again</Button>
		{/if}
	{/snippet}
</svelte:boundary>
