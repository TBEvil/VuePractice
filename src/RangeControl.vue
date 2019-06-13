<template>
  <div>
    <div style="display:inline" v-for="(i, index) in count" :key="index" >
      <select v-model="rangeObj['operator' + (index + 1)]">
        <option v-for="(val, key1) in optionsList" :key="key1" :value="val">{{val}}</option>
      </select>
      <input type="text" v-model="rangeObj['num' + (index+1)]" maxlength="10" @keyup="showKeyUp"/><span>%</span>
    </div>
    <span @click="addOrReduce(iconAddOrReduce === '+')">{{iconAddOrReduce}}</span>
    <div v-show="!validated">请输入正确格式</div>
  </div>
</template>
<script>
import RangeOper from './RangeOper'
const OPERTOR_GREATER=['>','>=']
const OPERTOR_SMALLER=['<','<=']
export default {
  name: 'RangeControl',
  props:{
    rangeValues: RangeOper
  },
  data(){
    return {
      iconAddOrReduce: '+',
      optionsList: ['<','<=','>','>='],
      rangeObj:this.rangeValues,
      count: 0,
      validated: true,

    }
  },
  mounted(){
    if(this.rangeObj.operator1 !== null){
      let oper1= {
        operator:this.rangeObj.operator1,
        num:this.rangeObj.num1
      }
      this.count = 1;
    }
    if(this.rangeObj.operator2 !== null){
      let oper2= {
        operator:this.rangeObj.operator2, 
        num:this.rangeObj.num2
      }
      this.count = 2;
    }
  },
  computed:{
    num1(){
      return this.rangeObj.num1
    }
  },
  watch:{
      num1(newVal) {
        this.validated = this.doValidation();
        console.log(this.validated );
      },  
  },
  methods: {
    showKeyUp() {
      console.log(this.num1);
    },
    addOrReduce: function(){
      this.iconAddOrReduce = this.iconAddOrReduce === '+'? '-' : '+';
      this.count = this.iconAddOrReduce === '+'? 1 : 2;
      if(this.count === 2 && this.rangeObj.operator2 === null) {
        this.rangeObj.operator2 = '<';
      }
    },
    doValidation(){ 
      // 校验数字
      if(!/^-?\d*\.?\d+$/.test(this.rangeObj.num1)){
        return false;
      }
      if(this.count === 2) {//校验操作符和数字
        if(!/^-?\d*\.?\d+$/.test(this.rangeObj.num2)){
          return false;
        }
        //判断运算符是否能匹配，比如> < / >= < / > <=等 
        if((OPERTOR_GREATER.indexOf(this.rangeObj.operator1)>-1 && OPERTOR_GREATER.indexOf(this.rangeObj.operator2)<0) ||
        (OPERTOR_SMALLER.indexOf(this.rangeObj.operator1)>-1 && OPERTOR_SMALLER.indexOf(this.rangeObj.operator2)<0)){
          //判断大于的数要比小数的数小
          if((OPERTOR_GREATER.indexOf(this.rangeObj.operator1)>-1 && this.rangeObj.num1 <= this.rangeObj.num2)||
          (OPERTOR_SMALLER.indexOf(this.rangeObj.operator1)>-1 && this.rangeObj.num1 >= this.rangeObj.num2)){
            return true;
          }
        }
        return false;
      } 
      return true;
    }
  }
}
</script>

