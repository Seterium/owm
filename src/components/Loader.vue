<script>
export default {
  name: 'Loader',
  props: {
    centered: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
<template>
  <div
    class="loader"
    :class="{
      'loader--centered': centered
    }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381"
      style="transform: rotate(0deg);"
    >
      <circle
        fill="transparent"
        cx="43.80952380952381"
        cy="43.80952380952381"
        r="20"
        stroke-width="3.8095238095238093"
        stroke-dasharray="125.664"
        stroke-dashoffset="125.66370614359172px"
        class="loader__overlay"
      ></circle>
    </svg>
  </div>
</template>
<style src="@/assets/styles/components/loader.scss" lang="scss"></style>