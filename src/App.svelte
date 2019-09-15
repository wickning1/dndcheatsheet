<script>
	import ActionList from './ActionList.svelte'
	import SkillList from './SkillList.svelte'
	import Character from './lib/character.js'
	import Defenses from './Defenses.svelte'
	import TrackerList from './TrackerList.svelte'
	import { CardLayout, Card } from 'simple-svelte-components'
	import jsyaml from 'js-yaml'
	const params = new URLSearchParams(window.location.search)
	const charname = params.get('c')
	const novice = params.has('novice')
	let characterdata = undefined
	fetch(`/data/${charname}.yaml`).then(resp => resp.text()).then(text => {
		const data = jsyaml.safeLoad(text)
		characterdata = new Character(data, novice)
	}).catch(e => console.log(e))
	fetch(`/data/${charname}.json`).then(resp => resp.json()).then(data => {
		characterdata = new Character(data, novice)
	}).catch(e => console.log(e))
</script>

<style>
	h1 {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	h1 .name {
		color: var(--purple);
	}
	h1 .alignment {
		font-size: 0.8em;
		color: var(--darkgray);
	}
	h1 .class {
		font-size: 0.8em;
		color: var(--darkgray);
	}
</style>

{#if !charname}
	No character file specified.
{:else if !characterdata}
	Loading...
{:else}
	<h1><span class="name">{characterdata.name}</span><span class="alignment">{characterdata.alignment || ''}</span><span class="class">{characterdata.class}</span></h1>
	<h2>Actions</h2>
	<CardLayout maxwidth={700} preserveorder>
		<ActionList title="Actions" actions={characterdata.actions}/>
		<ActionList title="Actions (offensive)" actions={characterdata.offensiveactions}/>
		<ActionList title="Actions (defensive)" actions={characterdata.defensiveactions}/>
		<ActionList title="Basic Actions" actions={characterdata.basicactions}/>
		<ActionList title="Bonus Actions" actions={characterdata.bonusactions}/>
		<ActionList title="Reactions" actions={characterdata.reactions}/>
		<ActionList title="Non-Combat" actions={characterdata.ritual}/>
		<ActionList title="Special / Triggered" actions={characterdata.triggered}/>
	</CardLayout>
	{#if characterdata.trackers && characterdata.trackers.length}
		<TrackerList title="Limited Uses" trackers={characterdata.trackers} />
	{/if}
	<CardLayout maxwidth={700}>
		<Card>
			<h2>Skills</h2>
			<SkillList title="Dungeon" skills={characterdata.computedskills.filter(s => s.type === 'key')} />
			<SkillList title="Conversation" skills={characterdata.computedskills.filter(s => s.type === 'conversation')} />
			<SkillList title="Skilled" skills={characterdata.computedskills.filter(s => !s.type && s.bonus > 1)} />
		</Card>
		<Card>
			<h2>Defenses</h2>
			<Defenses defenses={characterdata.defenses} />
		</Card>
	</CardLayout>
{/if}
