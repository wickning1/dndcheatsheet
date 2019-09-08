<script>
  export let title
  export let trackers
  let lines = []
  $: {
    lines = []
    for (let i = 0; trackers && i < trackers.length; i += 4) {
      lines.push([trackers[i], trackers[i+1], trackers[i+2], trackers[i+3]])
    }
  }
</script>

<style>
  .key {
    width: 18%;
  }
  .value {
    width: 7%;
  }
</style>

<table>
  <thead><tr><th colspan="8">Limited Uses</th></tr></thead>
  {#each lines as line, idx}
    <tr class={idx % 2 ? 'even' : 'odd'}>
      {#each line as tracker}
        <td class="key">{#if tracker}{tracker.name}{:else}&nbsp;{/if}</td>
        <td class="value">{#if tracker}{tracker.value}/{tracker.refresh}{:else}&nbsp;{/if}</td>
      {/each}
    </tr>
  {/each}
</table>
