<script>
	import ContractInfoBox from './components/contract/ContractInfoBox.svelte';
	import Introduction from './components/introduction/Introduction.svelte';
	import Experiences from './components/content/Experiences.svelte';
	import Projects from './components/content/Projects.svelte';
	import Education from './components/content/Education.svelte';
	import Articles from './components/content/Articles.svelte';
	import {name, engName, lastUpdated, channels,contract, introductionText, workSection,projects, otherprojects} from './data/index.svelte';
    import BigHeader from './components/header/BigHeader.svelte';
    import Skills from './components/content/Skills.svelte';
</script>

<main>
	<h1><span class="deco_bar" />{name} ({engName})</h1>
	<span class="update_date">last updated: {lastUpdated}</span>
	<Introduction introduction={introductionText} />
	<Skills />
	<div class="div" />
	<div class="contracts_info">
		<ContractInfoBox title={'Channels'} list={channels} />
		<ContractInfoBox title={'Contracts'} list={contract} />
	</div>
	<Experiences title="EXPERIENCES" item={workSection} />
	<Projects title="PROJECTS" projects={projects} />
	<Projects title="그 외 프로젝트" projects={otherprojects} />
	<Articles />
	<Education />
</main>

<style lang="scss">
	main {
		/* text-align: center; */
		width:1000px;
		margin: 0 auto;
		padding: 1em;
		box-sizing: border-box;
		margin: 0 auto;
	}

	h1 {
		display: flex;
		align-items: center;
	}

	.deco_bar {
		width: 7px;
		background-color: #A41D1A;
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
	
	@media (max-width: 640px) {
		main {
			width: 100%;
			padding: 20px;
			max-width: none;
			box-sizing: border-box;
			font-size: 12px;
		}
	}
</style>
