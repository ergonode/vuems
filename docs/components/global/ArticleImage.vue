<template>
  <img :src="imgSrc" :alt="alt" class="article-image" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  computed: {
    imgSrc() {
      try {
        return require(`./../../static/${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>
