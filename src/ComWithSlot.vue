<template>
  <div>
    <span>v-slot</span>
    <slot v-bind:user="testSlot">{{testSlot.lastName}}</slot>
    <slot v-bind="{person:testSlot, address:{city:'天津'}}" name="first"></slot>
    <slot :user="testSlot" :length="testSlotNum" name="second">{{testSlot.lastName}}</slot>
    <slot v-bind="testSlot" name="third">{{testSlot.lastName}}</slot>
  </div>
</template>
<script>
export default {
  name: "ComWithSlot",
  data(){
    return{
      testSlot: { name: "test",lastName:"last"},
      testSlotNum: 5
    }
  },
  mounted(){
    setTimeout(()=>{console.log(this.$scopedSlots);},5000);
    
  }
}
</script>
<style lang="scss" scoped>
$space: 20px;
span {
  color: #cc3;
  padding: $space - 11px;
}
</style>



