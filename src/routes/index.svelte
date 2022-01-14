<script>
    import {session} from '$app/stores'
</script>
{#if $session.user}
     User : {JSON.stringify($session.user)}
{:else}
     No user
{/if}

<h2>Home page</h2>
<p>Visit <a href="https://blog.logrocket.com/authentication-sveltekit-using-cookies/">Jannick LogRocket</a> to read the documentation</p>
