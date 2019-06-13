<template>
  <div>
    i am one
  </div>
</template>
<script>
export default {
  name: "testKeepAlive1",
  activated() {
    console.log("1 is activated");
  },
  created() {
    console.log("1 is created");
  }
}
</script>