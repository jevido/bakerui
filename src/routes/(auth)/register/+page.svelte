<script>
	import { cn } from '$lib/utils.js';

	import placeholder from '$lib/assets/placeholder.svg';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { login, sdk } from '$lib/sdk';
	import { SDL_IM_MODULE } from '$env/static/private';

	let { class: className, ...restProps } = $props();

	let formData = $state({
		email: '',
		password: '',
		confirmPassword: ''
	});

	async function handleSubmit(event) {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.warning('Passwords do not match!');
			return;
		}

		const registration = await sdk.auth.register.post({
			email: formData.email,
			username: formData.username,
			password: formData.password
		});

		if (registration.token) {
			toast.success('Account created successfully!');

			await login({
				email: formData.email,
				username: formData.username,
				password: formData.password
			});

			goto('/dashboard');
		} else {
			toast.error(`Registration failed: ${registration.error.message}`);
		}
	}
</script>

<div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
	<div class="w-full max-w-sm md:max-w-4xl">
		<div class={cn('flex flex-col gap-6', className)} {...restProps}>
			<Card.Root class="overflow-hidden p-0">
				<Card.Content class="grid p-0 md:grid-cols-2">
					<form onsubmit={handleSubmit} class="p-6 md:p-8">
						<Field.Group>
							<div class="flex flex-col items-center gap-2 text-center">
								<h1 class="text-2xl font-bold">Create your account</h1>
								<p class="text-sm text-balance text-muted-foreground">
									Enter your info below to create your account and get started.
								</p>
							</div>
							<Field.Field>
								<Field.Label for="email">Email</Field.Label>
								<Input
									bind:value={formData.email}
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
								<Field.Description>
									We'll use this to allow you to recover a password, and send mail when <i>you</i> want
									them. We will not share your email with anyone else.
								</Field.Description>
							</Field.Field>
							<Field.Field>
								<Field.Label for="username">Username</Field.Label>
								<Input
									bind:value={formData.username}
									id="username"
									type="text"
									placeholder="somecoolname"
									required
								/>
								<Field.Description>
									This is the name that will be displayed on your profile.
								</Field.Description>
							</Field.Field>
							<Field.Field>
								<Field.Field class="grid grid-cols-2 gap-4">
									<Field.Field>
										<Field.Label for="password">Password</Field.Label>
										<Input bind:value={formData.password} id="password" type="password" required />
									</Field.Field>
									<Field.Field>
										<Field.Label for="confirm-password">Confirm Password</Field.Label>
										<Input
											bind:value={formData.confirmPassword}
											id="confirm-password"
											type="password"
											required
										/>
									</Field.Field>
								</Field.Field>
								<Field.Description>Must be at least 8 characters long.</Field.Description>
							</Field.Field>
							<Field.Field>
								<Button type="submit">Create Account</Button>
							</Field.Field>
							<Field.Separator class="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</Field.Separator>
							<Field.Field class="flex justify-between  gap-4">
								<Button variant="outline" disabled>Google (coming soon)</Button>
								<Button variant="outline" disabled>GitHub (coming soon)</Button>
							</Field.Field>
							<Field.Description class="text-center">
								Already have an account? <a href="/login">Sign in</a>
							</Field.Description>
						</Field.Group>
					</form>
					<div class="relative hidden bg-muted md:block">
						<img
							src={placeholder}
							alt=""
							class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</Card.Content>
			</Card.Root>
			<Field.Description class="px-6 text-center">
				By clicking continue, you agree to our <a href="#/">Terms of Service</a>
				and <a href="#/">Privacy Policy</a>.
			</Field.Description>
		</div>
	</div>
</div>
