<script context="module">
  export async function load({ session }) {
    console.log('confidentiel layout session.user : ', session.user)
    if (!session?.user) {
      return {
        status: 302,
        redirect: "/sign-in"
      }
    }
    return {
      props: {
        user: session.user
      }
    };
  }
</script>
<script>
  import Nav from '$lib/partials/NavConfidentielle.svelte'
  export let user;
  // import { session } from '$app/stores';
  // $session.user;
</script>
<Nav />
<h2>Hi! You are registered with email {user.email}</h2>
<slot />