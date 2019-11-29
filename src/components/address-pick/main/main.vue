<template>
  <div class="model flex row">
    <pick
      v-for="(item,index) in showKey"
      :key="'address-pick-index'+index"
      :data="data[item].data"
      :value="data[item].select"
      :label="label"
      :unique="unique"
      :name="item"
      @change="change"
    ></pick>
  </div>
</template>
<script>
import Pick from "../../pick/src/main";
import propsMixins from "../mixins/props";
import eventMixins from "../mixins/event";
import handleMixins from "../mixins/handle";
export default {
  name: "address-pick",
  components: { Pick },
  mixins: [propsMixins, eventMixins, handleMixins]
};
</script>
<style scoped src="../index.scss" lang="scss"></style>
