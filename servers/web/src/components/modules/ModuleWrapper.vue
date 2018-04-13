<template>
  <div class="module-wrapper">
    <component :is="content">
    </component>
  </div>
</template>

<script>
  import TextModule from './TextModule.vue'
  import VideoModule from './VideoModule.vue'

  export default {
    name: "ModuleWrapper",
    props: {
      content: {
        type: Object,
        validator(value) {
          return [TextModule, VideoModule].indexOf(value) !== -1;
        }
      }
    },
    components: {
      TextModule,
      VideoModule
    }
  }
</script>
