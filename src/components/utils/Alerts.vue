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
//alert takes the variant as prop from its parent and  "alert-heading" for the heading of alert
  export default {
    name:'Alert',
    props:{
      variant:String
    }
  }
</script>