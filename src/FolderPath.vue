<template>
  <div>
    <button :disabled="foldersPath.length <= 1" @click="backToPrevious">返回上一级</button>
    <span>|</span>
    <template v-for="(el, key) in foldersPath">
      <button :key="key" @click="backToAFolder(key + 1 )">{{el.name}}</button>
       <span :key="`tag${key}`" @click.once="showSpanIsClicked"> > </span>
    </template>
    <editabel-table v-on="$listeners"/>
  </div>
</template>
<script>
import EditableTable from './EditableTable';
export default {
  components: {
    'editabel-table': EditableTable
  },
  data() {
    return {
      foldersPath: [
        { id: 0, name: '规程规约'}
      ]
    }
  },
  mounted() {
    console.log('show $attrs');
    console.log(this.$attrs);
  },
  methods: {
    // 打开一个新的文件夹
    openFolder(folder) {
      this.foldersPath.push(folder);
    },
    // 回到上一级文件夹
    backToPrevious() {
      this.foldersPath.pop();
    },
    // 回到指定的文件夹
    backToAFolder(index) {
      this.foldersPath.splice(index);
    },
    showSpanIsClicked() {
      alert('span is clicked')
    }
  }

}
</script>

