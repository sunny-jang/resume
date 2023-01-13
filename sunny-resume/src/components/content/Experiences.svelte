<script>
import BigHeader from '../header/BigHeader.svelte';
export let item;
export let title;
</script>

<div class="content_section">
    <BigHeader title={title} />
    <div class="content">
    {#each item.workList as experience}
        <div class="experience">
            <div class="content_left">
                <h4>{experience.companyName}</h4>
                <span>{experience.period}</span>
            </div>
            <div class="content_right">
                <h5>{experience.description}</h5>
                <ul>
                {#each experience.detailList as detail}
                    <li class="detail">{detail.content}</li>
                {/each}
                    <li>Tech Skills: 
                        {#each experience.techSkils as skills}
                            <span class="skil">{skills}</span>
                        {/each}
                    </li>
                </ul>
                
            </div>
        </div>
    {/each}
    </div>
</div>

<style lang="scss">
.experience {
    display: flex;

    .content_left {
        width: 30%;
    }

    .content_right {
        width: 70%;
    }

    .detail {
        font-size: 14px;
    }

    .skil {
        padding: 3px 5px;
        background: darkcyan;
        color: white;
        border-radius: 6px;
        font-size: 12px;
        margin-right: 5px;
    }
}
</style>