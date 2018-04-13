<template>
  <div class="module">
    <div v-if="editing">
      <textarea class="text-content" v-model.sync="editedContent.embedUrl"></textarea>
    </div>
    <div class="aspect-ratio" v-else>
      <iframe width="100%" :src="content.embedUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  </div>

</template>

<script>
  export default {
    name: "VideoModule",
    props: {
      content: {
        type: Object,
        requred: true
      },
      editing: {
        type: Boolean
      }
    },
    data() {
      return {
        editedContent: {},
      }
    },
    methods: {
      contentUpdated(newContent) {
        this.$emit('contentUpdated', newContent);
      }
    },
    watch: {
      editing(val) {
        if (val) {
          this.editedContent = this.content;
        } else {
          this.contentUpdated(this.editedContent);
        }
      }
    }
  }
</script>

<style scoped>
  .aspect-ratio {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 51%;
  }
  .aspect-ratio iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0; top: 0;
  }
</style>
