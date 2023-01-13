<script>
	import ContractInfoBox from './components/contract/ContractInfoBox.svelte';
	import Introduction from './components/introduction/Introduction.svelte';
	import BigHeader from './components/header/BigHeader.svelte';

	let name = '장은선';
	let engName = 'Sunny';
	let lastUpdated = '2023.01.13';

	let channels = [
		{
			label: 'Github',
			href: 'https://github.com/sunny-jang',
			text: 'https://github.com/sunny-jang'
		},
		{
			label: 'Blog',
			href: 'https://sunny-jang.tistory.com',
			text: 'https://sunny-jang.tistory.com'
		},
	];
	let contract = [
		{
			label: 'Email',
			text: 'esunbest@gmail.com'
		},
	];

	let introduction = [
		'프로젝트 결과물이 성과를 보였을 때 가장 성취감이 큰',
		'개발 생산성을 높이는기술을 서비스에 접목시킬 때가 즐거운',
		'새로운 것을 배우는 것에 두려움이 없는',
		'한줄의 코드로도 여러 삶에 가치를 더해줄 수 있는',
	]
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
	<BigHeader title="Work Experience" />
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

	h3 {
		color: orange;
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
