<template>
  <div id="container">
    <button @click.capture="showClick">click me</button>
    <div id="editableTable" style="position:relative">
        <table>
           <tr>
             <td style="width:41px;">序号</td>
             <td style="width:15%">品种及规格</td>
             <td style="width:8%;">数量</td>
             <td style="width:8%;">单位</td>
             <td style="width:40%;">质量指标</td>
             <td style="width:15%;">类型</td>
             <td style="width:9%;">操作</td>
           </tr>
           <tr v-for="(item, index) in dataSource" :key="index">
              <td>{{index + 1}}</td>
              <td>
                <div class="spanSelect" @click="editTheRow(item.sourceSpecId, item.sourceQuantity, index, $event)">{{item.sourceSpec}}</div>
              </td>
              <td>
                <div class="spanInput" @click="editTheRow(item.sourceSpecId, item.sourceQuantity, index, $event)">{{item.sourceQuantity}}</div>
              </td>
              <td>{{item.sourceUnit}}</td>
              <td style="text-align:left">{{item.sourceStandard}}</td>
              <td>{{item.sourceType}}</td>
              <td><a @click="deleteRow(item.id)">删除</a></td>
           </tr>
        </table>
    </div>
    <div id="editableRow" v-show="editting" :style="styleObject">
      <table style="background-color:#fff">
        <tr>
          <td style="width:41px;">{{editIndex}}</td>
          <td style="width:15%;">
            <select name="varitiesAndSpecification" id="varitiesAndSpecification" v-model="specification" :value="selectedSpec">
              <option value="1">原煤</option>
              <option value="2">精煤</option>
              <option value="3">煤</option>
              <option value="4">其他</option>
            </select>
          </td>
          <td style="width:8%;"> 
            <input type="text" v-model="quantity">
          </td>
          <td style="width:8%;"></td>
          <td style="width:40%;"></td>
          <td style="width:15%;"></td>
          <td style="width:63%;"><a @click="deleteRow(editIndex)">删除</a></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditableTable',
  props: {
    
  },
  data() {
    return{
      dataSource:[],
      editting: false,
      editIndex:0,
      specification: '',
      selectedSpec: '',
      quantity: 0,
      unit: '',
      standard: '',
      type: '',
      styleObject: {
        top: '1px',
        left: '1px',
        position: 'absolute',
        marginTop: '1px'
      }
    }
  },
  beforeMount() {
    let source ={
      id:0,
      sourceSpecId: 0,
      sourceSpec: '',
      sourceQuantity: 0,
      sourceUnit: '',
      sourceStandard:'',
      sourceType:''
    }
    let newSource = Object.create(source);
    newSource.id= 1;
    newSource.sourceSpecId = 1;
    newSource.sourceSpec = '原煤';
    newSource.sourceStandard = '全水';
    newSource.sourceQuantity = 200;
    newSource.sourceUnit = '吨';
    newSource.sourceType = '原煤';
    let newSource1 = Object.create(source);
    newSource1.id= 2;
    newSource1.sourceSpecId = 2;
    newSource1.sourceSpec = '精煤';
    newSource1.sourceQuantity = 400;
    newSource1.sourceUnit = '吨';
    newSource1.sourceType = '洗选产品';
    // this.$set(this.dataSource, 0, newSource);
    // this.$set(this.dataSource, 1, newSource1);
    this.dataSource.push(newSource);
    this.dataSource.push(newSource1);
    this.editIndex = 2;
    console.log(this.dataSource);
  },
  methods: { 
    editTheRow: function(specId, quantity, index, e) {
      if(e != undefined){
        let positionInfo = e.target.offsetParent.parentNode.firstElementChild.getBoundingClientRect();
        this.styleObject.top = positionInfo.y + 'px';
        this.styleObject.left = positionInfo.x + 'px';
        this.editting = true;
        this.editIndex = index + 1;
      }
    },
    deleteRow: function(id){
      alert(id);
    },
    showClick(){
      alert('you click me')
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
#editableTable {
  position: relative;
}
/**-----table style------*/
table {
  color:#333333;
  border-width: 0px;
  border-color: #a9c6c9;
  border-collapse:collapse;
}
table th {
  background-color: #ccc;
  border-width: 1px;
  border-color: #ccc;
  border-style: solid;
  padding:8px;
}
 table td {
  border-width: 0px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #a9c6c9;
  text-align: center;
  padding:8px;
 }
 #editableRow td {
   border-bottom-width: 0px;
 }
/**-----input and select style------*/
.spanSelect, .spanInput, select, input {
  border-width: 1px;
  border-color: #666565;
  border-style: solid;
}
.spanSelect,.spanInput {
  margin: 0px auto;
  display: inline-block;
}
.spanSelect, select{
  height:30ox;
  width:150px;
}
.spanSelect::after {
  content:'>';
  color:#666565;
  position: relative;
  width:30px;
  left:50px;
}
.spanInput, input {
  height:30ox;
  width:45px;
}
</style>
