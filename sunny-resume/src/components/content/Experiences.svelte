<script>
import BigHeader from '../header/BigHeader.svelte';
import Projects from './Projects.svelte';
export let item;
export let title;
</script>

<div class="content_section">
    <BigHeader title={title} />
    <div class="content">
    {#each item.workList as experience}
        <div class="experience_projects">
            <div class="experience">
                <div class="content_left">
                    <h4>{experience.companyName}</h4>
                    <div>{experience.period}</div>
                </div>
                <div class="content_right">
                    <h5>{experience.description}</h5>
                    <ul>
                    {#each experience.detailList as detail}
                        <li class="detail">{detail.content}</li>
                    {/each}
                        <li class="detail">Tech Skills: 
                            {#each experience.techSkils as skills}
                                <span class="skil">{skills}</span>
                            {/each}
                        </li>
                    </ul>
                </div>
            </div>
            <Projects title="" projects={experience.projects} />
        </div>
        
    {/each}
    </div>
</div>

<style lang="scss">
.experience_projects {
    margin-top: 80px;
    border-top: 3px solid darkorange;

    &:first-child {
        margin-top: 0px;
    }
}
.experience {
    display: flex;
    padding: 20px 0;    

    h4 {
        font-size: 2rem;
        margin-top: 0px;
        margin-bottom: 30px;
        display: inline-block;
        padding-bottom: 5px;
        padding-left: 10px;
        // border-left: 4px solid orange;
    }

    h5 {
        margin-top: 0;
    }

    .content_left {
        width: 30%;
    }

    .content_right {
        width: 70%;
    }

    .detail {
        font-size: 16px;
    }

    .skil {
        padding: 3px 5px;
        margin-bottom: 3px;
        background: darkcyan;
        color: white;
        border-radius: 6px;
        font-size: 12px;
        margin-right: 5px;
        word-break: break-all;
        display: inline-block;
    }
}

@media (max-width: 640px) {
		.experience {
            flex-direction: column;
            .content_right,
            .content_left {
                width: 100%;
            }
        }
	}
</style>