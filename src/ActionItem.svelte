<script>
  export let action = {}
  export let even = false
</script>

<tr class="action-item" class:even>
  <td class="name">{action.name}</td>
  <td class="tohit">
    {#if action.tohit}{action.tohit}{:else}&nbsp;{/if}
  </td>
  <td>
    {#if action.dc}{action.dc}{:else}&nbsp;{/if}
  </td>
  <td class="damage">
    {#if action.damage}{action.damage}{:else}&nbsp;{/if}
  </td>
</tr>
{#if action.description}
  <tr class="description" class:even>
    <td colspan="4">{action.description}</td>
  </tr>
{/if}
