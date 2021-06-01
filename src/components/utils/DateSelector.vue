<template>
    <div  class="row justify-content-between">
        <div class="col">
            <div class="font-weight-bolder">{{dateTodisp}} </div>
            <div class="text-muted">{{dayDisplay}}</div>
        </div>
        <div class="col" >
            <b-form-datepicker id="calendar-datepicker" v-model="date" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="en" @context="onContext" v-on:context="$emit('updateDate',date)"  calendar-width="100%" class="mb-2"></b-form-datepicker>
        </div>
    </div>
</template>

<script>
//to add the date with the correct format along with the date picker input element
  export default {
    name:'DateSelector',
    data() {
            const date = new Date();
            const today = date.toISOString().slice(0,10);
      return {
        date: today,
        formatted: '',
        dateTodisp:'',
        dayDisplay:''
      }
    },
    methods:{
        onContext(ctx) {
        this.formatted = ctx.selectedFormatted;
        const fDate = new Date(this.date)
        this.dateTodisp=`${fDate.getDate()} ${fDate.toLocaleString('default', { month: 'long' })} ${fDate.getFullYear()}`;
        this.dayDisplay=`${fDate.toLocaleString('default', { weekday: 'long' })}`;
      }
    }
  }
</script>

<style scoped>
.col{
  flex-basis: 100%;
}
@media (min-width:540px) {
  .col{
  flex-basis: 50%;
}
}
</style>