<script>
export let introduction;
</script>

<div class="introduction">
    <span>저는 <span>______</span> 엔지니어입니다.</span>
    <ol>
    {#each introduction as intro}
        <li>
            {intro}
        </li>
    {/each}
    </ol>
</div>

<style lang="scss">
ol {
    li {
        margin-bottom: 10px;
    }
}
</style>