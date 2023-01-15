<script>
export let title;
export let sideEle;
</script>

<h2>
    {title}
    {#if sideEle}{sideEle}{/if}
</h2>

<style>
    h2 {
        color: #D26A1B;
        padding: 50px 0px 10px;
        font-size: 30px;
        margin: 0;
    }
</style>