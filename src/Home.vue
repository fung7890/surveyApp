<template>
    <div>
        <app-server-status></app-server-status>

    </div>

    
</template>

<script>

import serverStatus from "./ServerStatus.vue"

export default {

    components:{
        'app-server-status': serverStatus
    }
  
}
</script>
