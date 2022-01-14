<script>
    const links = [
        {
            href: '/confidentiel',
            title: 'Index confidentiel'
        },
        {
            href: '/confidentiel/page-1',
            title: 'Page 1'
        },
        {
            href: '/confidentiel/page-2',
            title: 'Page 2'
        },
    ]
</script>
<nav>
    {#each links as {href, title}}
        <a {href} title="go to {title}">{title}</a>
    {/each}
</nav>

<style>
  nav > * {
    margin: 1rem .4rem;
  }
</style>