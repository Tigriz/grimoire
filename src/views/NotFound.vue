<template>
  <section>
    <div class="info fullscreen center-vertical text-center">
      <h1>404</h1>
      <p>Oups, cette page n'existe pas (encore ?)</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
section {
  height: 100%;
}
.fullscreen {
  background: url("../assets/img/404.jpg") no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.info {
  position: absolute;
  top: 0;
  text-shadow: 0 0 10px;
}

h1 {
  color: var(--purple);
  font-family: 'RM Ginger';
  font-weight: bold;
}

p {
  font-size: 1.5em;
  font-weight: 100;
  color: #fff;
}
</style>

