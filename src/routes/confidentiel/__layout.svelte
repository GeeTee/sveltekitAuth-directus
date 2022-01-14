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
  export let user;
  // import { session } from '$app/stores';
  // $session.user;
</script>
<h2>Hi! You are registered with email {user.email}</h2>
<slot />