<script>
  export let defenses
  let pairs = []
  $: {
    pairs = []
    for (let i = 0; defenses.special && i < defenses.special.length; i += 2) {
      pairs.push([defenses.special[i], defenses.special[i+1]])
    }
  }
</script>

<style>
  .key {
    width: 40%;
  }
  .value {
    width: 10%;
  }
  .defenses-special td {
    width: 50%;
    text-align: left;
    border-right: 1px solid var(--lightgray);
  }
</style>

<table class="defenses-vitals">
  <thead><tr><th colspan="4">Vitals</th></tr></thead>
  <tbody>
    <tr>
      <td class="key">Health (HP)</td><td class="value">{defenses.hp}</td>
      <td class="key">Armor Class (AC)</td><td class="value">{defenses.ac}</td>
    </tr>
  </tbody>
</table>

<table class="defenses-saves">
  <thead><tr><th colspan="4">Saving Throws</th></tr></thead>
  <tbody>
    <tr>
      <td class="key">Strength</td><td class="value">{defenses.computedsaves.str}</td>
      <td class="key">Intelligence</td><td class="value">{defenses.computedsaves.int}</td>
    </tr>
    <tr class="even">
      <td class="key">Dexterity</td><td class="value">{defenses.computedsaves.dex}</td>
      <td class="key">Wisdom</td><td class="value">{defenses.computedsaves.wis}</td>
    </tr>
    <tr>
      <td class="key">Constitution</td><td class="value">{defenses.computedsaves.con}</td>
      <td class="key">Charisma</td><td class="value">{defenses.computedsaves.cha}</td>
    </tr>
  </tbody>
</table>

{#if pairs.length}
  <table class="defenses-special">
    <thead><tr><th colspan="2">Special</th></tr></thead>
    <tbody>
      {#each pairs as pair, idx}
        <tr class={idx % 2 ? 'even' : 'odd'}>
          {#each pair as special}
            <td>
              {#if special}{special.name}{:else}&nbsp;{/if}
              {#if special && special.description}
                <div class="description">{special.description}</div>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
