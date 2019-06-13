<template>
  <div>
    i am two
  </div>
</template>
<script>
export default {
  name: "testKeepAlive1",
  activated() {
    console.log("1 is activated");
  },
  created() {
    console.log("2 is created");
  }
}
</script>

