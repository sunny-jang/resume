<script>
    import BigHeader from "../header/BigHeader.svelte";

export let introduction;
</script>

<div class="introduction">
    <BigHeader title="INTRODUCTION" />
    <span class="who_i_am">저는 <span>______</span> 엔지니어입니다.</span>
    <div class="introduction_text">
        {@html 
            introduction
        }
    
    </div>
</div>

<style lang="scss">
    .who_i_am {
        margin-bottom: 20px;
        display: block;
        font-weight: bold;
        font-size: 20px;
    }

    .introduction_text {
        margin-bottom: 30px;
    }
</style>