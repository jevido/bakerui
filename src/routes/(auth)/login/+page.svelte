<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldSeparator
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import placeholder from '$lib/assets/placeholder.svg';

	import { login, sdk } from '$lib/sdk/index.js';

	let { class: className, ...restProps } = $props();
	const id = $props.id();

	let formData = $state({
		email: '',
		password: ''
	});

	async function handleSubmit(event) {
		event.preventDefault();

		console.debug(formData);

		const result = await login({
			email: formData.email,
			password: formData.password
		});

		if (result.token) {
			toast.success('Logged in successfully!');
			goto('/dashboard');
		} else {
			toast.error(`Login failed: ${result.error.message}`);
		}
	}
</script>

<div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
	<div class="w-full max-w-sm md:max-w-3xl">
		<div class={cn('flex flex-col gap-6', className)} {...restProps}>
			<Card.Root class="overflow-hidden p-0">
				<Card.Content class="grid p-0 md:grid-cols-2">
					<form onsubmit={handleSubmit} class="p-6 md:p-8">
						<FieldGroup>
							<div class="flex flex-col items-center gap-2 text-center">
								<h1 class="text-2xl font-bold">Welcome back</h1>
								<p class="text-balance text-muted-foreground">Login to your Bakery account</p>
							</div>
							<Field>
								<FieldLabel for="email-{id}">Email or username</FieldLabel>
								<Input
									bind:value={formData.email}
									id="email-{id}"
									placeholder="m@example.com"
									required
								/>
							</Field>
							<Field>
								<div class="flex items-center">
									<FieldLabel for="password-{id}">Password</FieldLabel>
									<a
										href="/forgot-password"
										class="ms-auto text-sm underline-offset-2 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input bind:value={formData.password} id="password-{id}" type="password" required />
							</Field>
							<Field>
								<Button type="submit">Login</Button>
							</Field>
							<FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</FieldSeparator>
							<Field class="grid grid-cols-3 gap-4">
								<Field.Field class="flex justify-between  gap-4">
									<Button variant="outline" disabled>Google (coming soon)</Button>
									<Button variant="outline" disabled>GitHub (coming soon)</Button>
								</Field.Field>
							</Field>
							<FieldDescription class="text-center">
								Don't have an account? <a href="/register">Sign up</a>
							</FieldDescription>
						</FieldGroup>
					</form>
					<div class="relative hidden bg-muted md:block">
						<img
							src={placeholder}
							alt="placeholder"
							class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</Card.Content>
			</Card.Root>
			<FieldDescription class="px-6 text-center">
				By clicking continue, you agree to our <a href="##">Terms of Service</a> and
				<a href="##">Privacy Policy</a>.
			</FieldDescription>
		</div>
	</div>
</div>
