<script>
    export let title;
    export let list;
</script>

<div class="contract_info_box">
    <h3>{title}</h3>
    {#each list as item}
        <dl>
        <dt>{item.label}</dt>
        <dd><a href={item.href}>{item.text}</a></dd>		
    </dl>
    {/each}
</div>

<style lang="scss">
.contract_info_box {
    dl {
        display: flex;
        align-items: center;

        dt {
            width: 100px;
        }
    }
}
</style>