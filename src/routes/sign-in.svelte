<script>
  let email = 'test-1@galites.net'
  let password = 'Gien++45500'
  let error;
  async function handleSubmit() {
    const response = await fetch('/api/sign-in', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      error = (await response.json()).message;
      return;
    }
    window.location = '/confidentiel';
  }
</script>
<h3>Login page</h3>
<input type="email" name="emal" id="email" bind:value={email}>
<br><br>
<input type="password" name="password" id="password" bind:value={password}>
<br><br>
<button on:click={handleSubmit}>Se connecter</button>
{#if error}
     {error}
{/if}