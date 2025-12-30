<script>
	import { config, generateSDK } from '$lib/sdk/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';

	let health = $state('Loading random value...');
	const sdk = await generateSDK('http://localhost:3000/openapi.json');

	async function fetchHealth() {
		try {
			health = await sdk.health.get();

			toast.success('Health fetched', {
				description: 'Latest health status loaded'
			});
		} catch (err) {
			console.error(err);
			toast.warning('Error', { description: 'Failed to fetch health' });
		}
	}

	async function register() {
		try {
			const res = await sdk.auth.register.post({
				username: 'testuser',
				email: 'testuser@example.com',
				password: 'testpassword'
			});
			toast.success('User registered', {
				description: 'Test user created successfully'
			});
		} catch (err) {
			console.error(err);
			toast.warning('Registration failed', { description: err.error.message });
		}
	}

	async function login() {
		try {
			const res = await sdk.auth.login.post({
				username: 'testuser',
				password: 'testpassword'
			});
			console.debug('Login response:', res);
			toast.success('Login successful', {
				description: 'Test user logged in'
			});
		} catch (err) {
			console.error(err);
			toast.warning('Login failed', { description: err.error.message });
		}
	}

	fetchHealth();
</script>

<main class="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
	<h1 class="text-center text-4xl font-bold">
		Welcome to <span class="text-fuchsia-500">{config.name}</span>
	</h1>

	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>Health Status</Card.Title>
			<Card.Description>Check the backend status</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="mb-4 font-mono text-lg">{health.random}</p>
			<Button onclick={fetchHealth} class="w-full">Fetch Latest Health</Button>
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>Test User Actions</Card.Title>
			<Card.Description>Interact with the auth API</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4">
			<Button onclick={register} variant="secondary" class="w-full">Register Test User</Button>
			<Button onclick={login} variant="default" class="w-full">Login Test User</Button>
		</Card.Content>
	</Card.Root>

	<p class="mt-4 text-sm text-gray-400">Built with 💜</p>
</main>
