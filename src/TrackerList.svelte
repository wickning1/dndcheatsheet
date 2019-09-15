<script>
  export let title
  export let trackers
</script>

<style>
  .tracker-list {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin-bottom: 10px;
    border-left: 1px solid var(--lightgray);
  }
  .tracker-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.3em 0.5em;
    font-size: 0.9em;
    border-bottom: 1px solid var(--lightgray);
    border-right: 1px solid var(--lightgray);
  }
  .tracker-item .key {
    flex-grow: 1;
  }
  .tracker-item .value {
    text-align: right;
  }
  @media screen and (max-width: 299px) {
    .tracker-item:first-child {
      border-top: 1px solid var(--lightgray);
    }
    .tracker-item:nth-child(2n) {
      background-color: var(--beige);
    }
  }
  @media screen and (min-width: 300px) and (max-width: 599px) {
    .tracker-item {
      width: 50%;
    }
    .tracker-item:nth-child(1), .tracker-item:nth-child(2) {
      border-top: 1px solid var(--lightgray);
      flex-grow: 1;
    }
    .tracker-item:nth-child(4n+2), .tracker-item:nth-child(4n+3) {
      background-color: var(--beige);
    }
  }
  @media screen and (min-width: 600px) and (max-width: 799px) {
    .tracker-item {
      width: 33.3333%;
    }
    .tracker-item:nth-child(1), .tracker-item:nth-child(2), .tracker-item:nth-child(3) {
      border-top: 1px solid var(--lightgray);
      flex-grow: 1;
      max-width: 50%;
    }
    .tracker-item:nth-child(2n) {
      background-color: var(--beige);
    }
  }
  @media print, (min-width: 800px) {
    .tracker-item {
      width: 25%;
    }
    .tracker-item:nth-child(1), .tracker-item:nth-child(2), .tracker-item:nth-child(3), .tracker-item:nth-child(4) {
      border-top: 1px solid var(--lightgray);
      flex-grow: 1;
      max-width: 33.3333%;
    }
    .tracker-item:nth-child(8n+2), .tracker-item:nth-child(8n+4), .tracker-item:nth-child(8n+5), .tracker-item:nth-child(8n+7) {
      background-color: var(--beige);
    }
  }
</style>

<h2>Limited Uses</h2>
<div class="tracker-list">
  {#each trackers as tracker,idx}
    <div class="tracker-item">
      <span class="key">{#if tracker}{tracker.name}{:else}&nbsp;{/if}</span>
      <span class="value">{#if tracker}{tracker.value}/{tracker.refresh}{:else}&nbsp;{/if}</span>
    </div>
  {/each}
</div>
