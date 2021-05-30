<template>
    <div :style="{ backgroundImage: createBackgroundString }" style="position: absolute; height: 100%; width: 100%; text-align: center; padding:300px; font-size: 100px; color: white; font-style: oblique;" >
        Spotivue
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      angle: '45',
      color1: '#1D8954',
      color2: 'black'
    }
  },
  computed: {
    createBackgroundString() {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`;
    }
  }
}
</script>
