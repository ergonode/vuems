<template>
  <video playsinline controls muted>
    <source :src="videoSrc" type="video/mp4" class="article-video" />
  </video>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
  },
  computed: {
    videoSrc() {
      try {
        return require(`./../../assets/${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>
