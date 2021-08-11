<template>
  <b-navbar toggleable="md" type="dark" class="fixed-left" id="navbar">
    <b-navbar-nav class="justify-content-center">
      <b-nav-item
        class="text-center"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        style="margin-top: -6px"
        title="Accueil"
      >
        <b-navbar-brand to="/" class="mr-0">
          <img :src="publicPath + 'img/logo.png'" height="50" />
        </b-navbar-brand>
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        to="equipe"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Équipe"
      >
        <font-awesome-icon :icon="['fas', 'hat-wizard']" />
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        to="grimoire"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Grimoire"
      >
        <font-awesome-icon :icon="['fas', 'book']" />
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        to="festivites"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Festivités"
      >
        <font-awesome-icon :icon="['fas', 'moon']" />
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        target="_blank"
        href="https://sorcie.re/walpurgis"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Pleroma"
      >
        <img
          src="../assets/img/brand/pleroma.svg"
          class="svg-inline--fa fa-w-14 brand"
        />
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        target="_blank"
        href="https://matrix.to/#/+walpurgis:iiens.net"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Matrix"
      >
        <img
          src="../assets/img/brand/element.svg"
          class="svg-inline--fa fa-w-14 brand"
        />
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        target="_blank"
        href="https://discord.gg/Pazx5WDACc"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Discord"
      >
        <font-awesome-icon :icon="['fab', 'discord']" />
      </b-nav-item>
      <b-nav-item
        class="text-center px-3 px-md-0"
        target="_blank"
        href="mailto:walpurgis@listes.iiens.net"
        v-b-tooltip="{
          placement: 'left',
          variant: 'dark',
          boundary: 'viewport',
        }"
        title="Mail"
      >
        <font-awesome-icon :icon="['fas', 'envelope']" />
      </b-nav-item>
      <player
        :playlist="[
          `${publicPath}audio/Conturbatio.ogg`,
          `${publicPath}audio/Decretum.ogg`,
          `${publicPath}audio/Symposium magarum.ogg`,
          `${publicPath}audio/Serena ira.ogg`,
        ]"
        :autoPlay="false"
      />
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import Player from "../components/Player.vue";

export default {
  name: "Navbar",
  components: {
    Player,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
  z-index: 1000;
  background: #23272a;
  /* border-right: 2px solid var(--purple); */
}

.navbar-dark .navbar-nav .nav-link:hover,
li:hover .brand {
  color: #fff;
  opacity: 1;
}

.navbar {
  font-size: 2em;
  overflow-y: auto;
}

.navbar-brand {
  animation: pulsating 2s infinite;
}

.navbar-tooltip {
  position: fixed !important;
}

.brand {
  opacity: 0.5;
}

li svg {
  transition: 0.25s;
}
li:hover svg,
li:hover .brand {
  filter: drop-shadow(-4px 4px 15px var(--blue))
    drop-shadow(4px -4px 15px var(--purple));
}

/* navbar fixed left */
.navbar.fixed-left {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
}

/* responsive fixed top */
@media (min-width: 768px) {
  .navbar.fixed-left {
    bottom: 0;
    width: var(--navbar-size);
    flex-flow: column nowrap;
    align-items: flex-start;
  }

  .navbar.fixed-left .navbar-nav {
    flex-grow: 0;
    flex-direction: column;
    width: 100%;
  }

  .navbar.fixed-left .navbar-nav {
    flex-direction: column;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .navbar.fixed-left {
    position: unset;
    right: auto;
  }

  .navbar.fixed-left {
    top: 0;
    height: var(--navbar-top);
    flex-flow: row nowrap;
    align-items: flex-start;
    overflow-y: hidden;
  }

  .navbar.fixed-left .navbar-nav {
    flex-grow: 0;
    flex-direction: row;
    width: 100%;
  }

  li {
    padding: 0 5px;
  }
  .navbar.fixed-left {
    bottom: 0;
    width: 100%;
    flex-flow: row nowrap;
    align-items: flex-start;
  }

  .navbar.fixed-left .navbar-nav {
    justify-content: left !important;
    flex-grow: 0;
    flex-direction: row;
    width: 100%;
    z-index: 1500;
  }
}

@keyframes pulsating {
  0% {
    filter: drop-shadow(-4px 4px 15px var(--blue))
      drop-shadow(4px -4px 15px var(--purple));
  }
  50% {
    filter: drop-shadow(-4px 4px 15px transparent)
      drop-shadow(4px -4px 15px transparent);
  }
  100% {
    filter: drop-shadow(-4px 4px 15px var(--blue))
      drop-shadow(4px -4px 15px var(--purple));
  }
}
</style>
