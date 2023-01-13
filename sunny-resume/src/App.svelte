<script>
	import ContractInfoBox from './components/contract/ContractInfoBox.svelte';
	import Introduction from './components/introduction/Introduction.svelte';
	import Experiences from './components/content/Experiences.svelte';
	import Projects from './components/content/Projects.svelte';
	import {name, engName, lastUpdated, channels,contract, introduction, workSection, projects} from './data/index.svelte';
</script>

<main>
	<h1><span class="deco_bar" />{name} ({engName})</h1>
	<span class="update_date">last updated: {lastUpdated}</span>
	<Introduction introduction={introduction} />
	<div class="div" />
	<div class="contracts_info">
		<ContractInfoBox title={'Channels'} list={channels} />
		<ContractInfoBox title={'Contracts'} list={contract} />
	</div>
	<Experiences title="Work Experience" item={workSection} />
	<Projects title="Projects" item={projects} />
</main>

<style lang="scss">
	main {
		/* text-align: center; */
		width:820px;
		margin: 0 auto;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		display: flex;
		align-items: center;
	}

	.deco_bar {
		width: 7px;
		background-color: orange;
		display: inline-block;
		height: 40px;
		margin-right: 10px;
	}

	.update_date {
		font-style: italic;
	}

	.div {
		height: 1px;
		background-color: #eee;
	}
	
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
