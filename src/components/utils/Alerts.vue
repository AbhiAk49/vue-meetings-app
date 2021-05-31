<template>
  <div>
  <b-alert show :variant="variant">
    <hr>
    <h5 class="alert-heading">
      <slot name="alert-heading"></slot>
    </h5>
    <hr>
     <slot></slot>
  </b-alert>
</div>
</template>

<script>
  export default {
    name:'Alert',
    props:{
      variant:String
    }
  }
</script>