<script>
  export let title
  export let actions = []
  import ActionItem from './ActionItem.svelte'
  import { Card } from 'simple-svelte-components'
</script>

{#if actions.length}
  <Card>
    <table class="action-list">
      <thead>
        <tr><th>{title}</th><th>+</th><th>DC</th><th>Dmg</th></tr>
      </thead>
      <tbody>
        {#each actions as action, idx}
          <ActionItem action={action.computed} even={idx % 2} />
        {/each}
      </tbody>
    </table>
  </Card>
{/if}
