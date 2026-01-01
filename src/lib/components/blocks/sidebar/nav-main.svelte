<script>
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import MinusIcon from '@lucide/svelte/icons/minus';

	let { items } = $props();
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as item, index (item.title)}
			<Collapsible.Root open={index === 1} class="group/collapsible">
				<Sidebar.MenuItem>
					<Collapsible.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton {...props}>
								<item.icon />
								{item.title}
								<PlusIcon class="ms-auto group-data-[state=open]/collapsible:hidden" />
								<MinusIcon class="ms-auto group-data-[state=closed]/collapsible:hidden" />
							</Sidebar.MenuButton>
						{/snippet}
					</Collapsible.Trigger>
					{#if item.items?.length}
						<Collapsible.Content>
							<Sidebar.MenuSub>
								{#each item.items as subItem (subItem.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton isActive={subItem.isActive}>
											{#snippet child({ props })}
												<a href={subItem.url} {...props}>{subItem.title}</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						</Collapsible.Content>
					{/if}
				</Sidebar.MenuItem>
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
