<script>
import BigHeader from '../header/BigHeader.svelte';
export let title;
export let projects = [];
</script>
{#each projects as project}
    <div class="project_info">
        <h5>
            {project.projectTitle}
            <div class="project_detail">
                <span>({project.period})</span>
                <span> - </span>
                <span>{project.projectGroup}</span>
            </div>
        </h5>
        
        
        <p>{project.description}</p>
    </div>
{/each}

<style lang="scss">
    .project_info {
        border-bottom: 1px solid #eee;
    }
    h5 {
        font-size: 18px;
        margin-bottom: 10px;
        margin-top: 20px;
        padding-left: 15px;
        position: relative;
        font-weight: 700;

        &:after {
            display: block;
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background-color: orange;
            position: absolute;
            top: 10px;
            left: 0;
        }
    }

    .project_detail {
        display: inline-block;

        span {
            font-size: 15px;
            color: gray;
            font-weight: normal;
        }
    }

    p {
        white-space: pre-line;
    }
</style>