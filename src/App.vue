<template>
  <div>
    <button @click="openFolder">打开文件夹</button>
    <folder-path ref="folderPath" width="100" test="123" @click.capture="showNativeClick"/>
    <button @click="toggleCom">toggle compoent</button>
    <keep-alive>
      <component :is="comTest"></component>
    </keep-alive>
    <range-control :rangeValues="rangeValues1"/>
    <range-control :rangeValues="rangeValues"/>
    数组长度：<input type="text" v-model="arrayLength" >
    <input-controls-list :count="arrayLength.toString()" :dataArray="dataArray"/>
    <editabel-table/>
    <com-with-slot >
      <template v-slot:default="{user}">
        <span v-if="user.lastName">2222</span>
        {{user.name}}
      </template>
      
      <template v-slot:second="{user,length}">
        <div>{{user.name}}的身高为{{length}}</div>
      </template>

      <template v-slot:first="{person,address}">
        <div>{{person.name+"."+person.lastName}}地址{{address.city}}</div>
      </template>

       <template v-slot:third="t">
          <div ref="wrapper" :style="{ [direction === 'vertical' ? 'minHeight' : 'minWidth']: `${totalSize}px`,['border']:'solid 1px #ccc' }">
            <div style="color:blue;" :style="{ transform: `translate${direction === 'vertical' ? 'Y' : 'X'}(${position}px)` } ">{{t.name}}</div>
          </div>
      </template>
    </com-with-slot>
  </div>
</template>
<script>
import EditableTable from './EditableTable';
import RangeOper from './RangeOper';
import InputControlsList from "./InputControlsList";
import RangeControl from "./RangeControl";
import ComWithSlot from "./ComWithSlot";
import testKeepAlive1 from "./testKeepAlive1";
import testKeepAlive2 from "./testKeepAlive2";
import folderPath from "./FolderPath"
export default {
  name: 'App',
  components:{
    'input-controls-list': InputControlsList,
    'range-control': RangeControl,
    'editabel-table': EditableTable,
    'com-with-slot': ComWithSlot,
    'test-keep-alive-1': testKeepAlive1,
    'test-keep-alive-2': testKeepAlive2,
    'folder-path': folderPath
    
  },
  data() {
    return {
      comTest: testKeepAlive1,
      arrayLength: 3,
      arrayList:[],
      rangeValues: new RangeOper('<',5,null,null),
      rangeValues1: new RangeOper('<',5,null,null),
      dataArray: ['test','do','some'],
      direction:'vertical',
      position: 80,
      totalSize:200
    }
  },
  mounted(){
    let vm = this;
    // setTimeout(() => {
    //   console.log(vm.rangeValues);
    //   console.log(vm.rangeValues1);
    //   console.log(vm.dataArray);
    // }, 5000);
  },
  methods:{
    toggleCom() {
      this.comTest = this.comTest ===  testKeepAlive1 ?  testKeepAlive2 :  testKeepAlive1; 
    },
    openFolder() {
      console.log('打开文件夹')

      const folder = {
        name: `文件夹${~~Math.random() * 100}`,
        id: ~~Math.random() * 100
      }
      this.$refs.folderPath.openFolder(folder);
    },
    showNativeClick() {
      alert('you do a click')
    }
  }
}
</script>
<style>
</style>
