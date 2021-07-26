
<template>
    <div>Logout...</div>
</template>

<script>
export default {
    name: 'Logout',
    created() {
        this.$parent.user = null
        localStorage.removeItem('apiUser')
        this.$router.push('/signin')
    }
}
</script>