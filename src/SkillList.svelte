<script>
  export let title
  export let skills = []
  let pairs = []
  $: {
    pairs = []
    for (let i = 0; i < skills.length; i += 2) {
      pairs.push([skills[i], skills[i+1]])
    }
  }
</script>

<style>
  .name {
    width: 40%;
    text-align: left;
  }
  .bonus {
    width: 10%;
    border-right: 1px solid var(--lightgray);
    text-align: right;
  }
</style>

{#if skills.length}
  <table class="skill-list">
    <thead>
      <tr><th>{title}</th><th class="bonus">+</th><th></th><th class="bonus">+</th></tr>
    </thead>
    <tbody>
      {#each pairs as pair, idx}
        <tr class="skill-row {idx % 2 ? 'even' : 'odd'}">
          {#each pair as skill}
            <td class="name">{#if skill}{skill.name}<div class="description">{skill.description || ''}</div>{:else}&nbsp;{/if}</td>
            <td class="bonus">{#if skill}{skill.bonus}{:else}&nbsp;{/if}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
