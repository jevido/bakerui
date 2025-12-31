<script>
	import { Button } from '$lib/components/ui/button';

	import { sdk, logout as _logout, session } from '$lib/sdk';

	async function logout() {
		await _logout();
		location.reload();
	}
</script>

Hi {session.user.username} there Wanna log out?
<Button onclick={logout} variant="destructive">logout</Button>
