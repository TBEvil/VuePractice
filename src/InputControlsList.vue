<template>
  <ul>
    <li v-for="(val, key) in ValueList" :key="key">
      <input :value="val" @change="updateValueAtIndex(key,$event)">
      <span @click="removeALine(key)">X</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'InputControlsList',
  props:{
    count: String,
    refreshArray: Function,
    dataArray: Array
  },
  data() {
    return {
      ValueList: this.dataArray
    }
  },
  watch: {
    count( newVal){
      let reg = new RegExp("^[1-9][0-9]*$","g");
      if(newVal !== undefined  && reg.test(newVal.toString()))
      if(this.ValueList.length > newVal){
        this.ValueList.splice(newVal);
      } else if(this.ValueList.length < newVal){
        this.$set(this.ValueList, newVal-1, null);
      }
    }
  },
  methods: {
    removeALine: function(index) {
      this.ValueList.splice(index,1);
      //this.emitTheMethodOfParent();
    },
    updateValueAtIndex: function(index,event) {
      console.log(event);
      this.ValueList[index] = event.target.value;
      //this.emitTheMethodOfParent();
    },
    emitTheMethodOfParent: function(){
      this.refreshArray(this.ValueList);
      //this.$emit('refreshArray',this.ValueList)
    }

  }
}
</script>

