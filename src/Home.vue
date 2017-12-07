<style>
.all {
  color: black;

  margin-top: 200px;
  margin-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;

  font-size: 25px;
}

html, body{
    /* background-color: #0d51c1; */
}

</style>

<template>

    <app-server-status class="all"></app-server-status>

</template>

<script>

import serverStatus from "./ServerStatus.vue"

export default {

    components:{
        'app-server-status': serverStatus
    }

}
</script>
