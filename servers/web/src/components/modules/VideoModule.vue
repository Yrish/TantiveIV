<template>
  <div class="module">
    <iframe width="560" height="315" :src="embedUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
</template>

<script>
  export default {
    name: "VideoModule",
    data() {
      return {
    	   embedUrl: "https://www.youtube.com/embed/C0DPdy98e4c"
      }
    }
  }
</script>
