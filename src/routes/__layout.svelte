<script context="module">
    export const load = async ({session}) => {
        console.log('Main layout session : ', session)
        return {
            props: {
                
            }
        }
    }
</script>
<script>
    import Nav from '$lib/partials/Nav.svelte'
</script>
<Nav />
<h1>Sveltkit Session / Jannick</h1>
<slot />