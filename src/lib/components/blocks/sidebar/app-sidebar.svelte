<script module>
	import UsersIcon from '@lucide/svelte/icons/users';
	import AnvilIcon from '@lucide/svelte/icons/anvil';
	import LeafIcon from '@lucide/svelte/icons/leaf';
	import BuildingIcon from '@lucide/svelte/icons/building-2';
	import ChartGanttIcon from '@lucide/svelte/icons/chart-gantt';
	import TrafficConeIcon from '@lucide/svelte/icons/traffic-cone';

	const data = {
		user: {
			name: session.user.username,
			email: session.user.email,
			avatar: '/avatars/shadcn.jpg'
		},

		guilds: [
			{
				name: 'Acme Inc',
				logo: TrafficConeIcon,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: TrafficConeIcon,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: TrafficConeIcon,
				plan: 'Free'
			}
		],

		navigation: [
			{
				title: 'Getting started',
				icon: LeafIcon,
				items: [
					{
						title: 'Introduction',
						url: '#'
					},
					{
						title: 'Installation',
						url: '#'
					},
					{
						title: 'First Steps',
						url: '#'
					}
				]
			},
			{
				title: 'Guild Management',
				icon: BuildingIcon,
				items: [
					{
						title: 'Overview',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					},
					{
						title: 'Analytics',
						url: '#'
					}
				]
			},
			{
				title: 'Memberships',
				icon: UsersIcon,
				items: [
					{
						title: 'All Members',
						url: '#'
					},
					{
						title: 'Invitations',
						url: '#'
					},
					{
						title: 'Roles & Permissions',
						url: '#'
					}
				]
			},
			{
				title: 'Projects',
				icon: ChartGanttIcon,
				items: [
					{
						title: 'Project Alpha',
						url: '#'
					},
					{
						title: 'Project Beta',
						url: '#'
					},
					{
						title: 'Project Gamma',
						url: '#'
					}
				]
			},
			{
				title: 'Deployments',
				icon: AnvilIcon,
				items: [
					{
						title: 'All Deployments',
						url: '#'
					},
					{
						title: 'New Deployment',
						url: '#'
					},
					{
						title: 'Servers',
						url: '#'
					}
				]
			}
		]
	};
</script>

<script>
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import GuildSwitcher from './guild-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { session } from '$lib/sdk';

	let { ref = $bindable(null), ...restProps } = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<GuildSwitcher guilds={data.guilds} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navigation} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
