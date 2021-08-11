<template>
  <section class="container-l overflow-x">
    <h1>Grimoire</h1>
    <section style="text-align: center" v-if="errored">
      <b-alert show variant="danger">Erreur : {{ errored }}</b-alert>
    </section>

    <section v-else>
      <div v-if="loading" style="text-align: center">
        <b-spinner variant="light" label="Spinning"></b-spinner>
      </div>

      <div v-else>
        <div class="book">
          <span class="page turn"></span>
          <span class="page turn"></span>
          <span class="page turn"></span>
          <span class="page turn"></span>
          <span class="page turn"></span>
          <span class="page turn">
            <fade-transition :duration="500"
              ><div
                class="mirror"
                v-html="pages[active]"
              ></div></fade-transition
          ></span>
          <span class="cover"></span>
          <span class="page">
            <p class="text-center">
              <img
                id="grim-logo"
                :src="publicPath + 'img/logo.png'"
                width="100"
                @click="page(0)"
              />
            </p>
            <br />
            <p>
              Walpurgis vous incite cordialement à nous faire part de vos
              propositions sur les chans <b>#vœux </b>
              <b class="chan"
                ><a
                  href="https://discord.com/channels/771443927097016413/771447121957355543"
                  target="_blank"
                  class="mr-2"
                  ><font-awesome-icon :icon="['fab', 'discord']"
                /></a>
                <a
                  href="https://matrix.to/#/!CvCNIxejtvztRtvBpT:iiens.net?via=iiens.net&via=tedomum.net&via=helianthine.solar"
                  target="_blank"
                  ><img
                    src="../assets/img/brand/element.svg"
                    class="svg-inline--fa fa-w-14 brand" /></a
              ></b>
              et en débattre sur <b>#chaudron </b>
              <b class="chan"
                ><a
                  href="https://discord.com/channels/771443927097016413/772059462151569468"
                  target="_blank"
                  class="mr-2"
                  ><font-awesome-icon :icon="['fab', 'discord']"
                /></a>
                <a
                  href="https://matrix.to/#/!UmxErVTgDLPylhwdZj:iiens.net?via=iiens.net&via=tedomum.net&via=helianthine.solar"
                  target="_blank"
                  ><img
                    src="../assets/img/brand/element.svg"
                    class="svg-inline--fa fa-w-14 brand" /></a
              ></b>
            </p>
            <ul>
              <li
                v-for="point in list"
                :key="list.indexOf(point)"
                @click="page(list.indexOf(point) + 1)"
                class="point"
              >
                {{ point }}
              </li>
            </ul>
          </span>
          <span class="cover turn"></span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { FadeTransition } from "vue2-transitions";

export default {
  name: "Grimoire",
  components: {
    FadeTransition,
  },
  data() {
    return {
      active: 0,
      list: [],
      pages: [],
      loading: true,
      errored: false,
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    page: function (num) {
      this.active = num;
    },
  },
  mounted() {
    fetch(`files/grimoire.json`)
      .then((response) => {
        if (response.status !== 200) {
          this.errored = response.status;
          return;
        }
        response.json().then((data) => {
          this.list = data;
          for (let i = 0; i <= this.list.length; i++) {
            fetch(`files/grimoire/page${i}.html`)
              .then((response) => {
                if (response.status !== 200) {
                  this.errored = response.status;
                  return;
                }
                response.text().then((data) => {
                  this.pages.push(data);
                  this.loading = false;
                });
              })
              .catch((err) => {
                this.errored = err;
              });
          }
        });
      })
      .catch((err) => {
        this.errored = err;
      });
  },
};
</script>

<style scoped lang="scss">
.overflow-x {
  overflow-x: auto;
  overflow-y: auto;
}

#grim-logo {
  filter: drop-shadow(0 0 15px #000);
  cursor: pointer;
  transition: 0.3s;
}

#grim-logo:hover {
  filter: drop-shadow(0 0 15px var(--purple));
}

.brand {
  filter: brightness(0.375);
}
.brand:hover {
  filter: brightness(0);
}
.chan {
  cursor: pointer;
  filter: drop-shadow(0 0 15px #fff);
  font-size: 1.3em;
}
.book {
  margin: auto;
  width: 200%;
  max-width: 1000px;
  height: 800px;
  perspective: 70rem;
}
.cover {
  background-color: #36354e;
  transform: rotateY(0deg);
  width: 50%;
  height: 100%;
}
.page {
  background-color: #e9e6c4;
  transform: rotateY(0deg);
  width: 50%;
  height: 100%;
  text-align: left;
  font-size: 1em;
  color: #555;
  font-family: "Noto Sans Mono";
  overflow-x: hidden;
  overflow-y: auto;
}
.page::before,
.page::after {
  display: block;
  border-top: 1px dashed rgba(0, 0, 0, 0.3);
  content: "";
  padding-bottom: 1rem;
}

.page::after {
  margin-top: 1rem;
}

.point {
  cursor: pointer;
  list-style: point;
}

.point:hover {
  color: var(--purple);
  padding-left: 5px;
}

.cover,
.page {
  position: absolute;
  padding: 1rem;
  transform-origin: 100% 0;
  border-radius: 5px 0 0 5px;
  box-shadow: inset 3px 0px 20px rgba(0, 0, 0, 0.2),
    0px 0px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.cover.turn {
  animation: bookCover 3s forwards;
}
.page.turn {
  animation: bookOpen 3s forwards;
}
.page:nth-of-type(1) {
  animation-delay: 0.05s;
}
.page:nth-of-type(2) {
  animation-delay: 0.33s;
}
.page:nth-of-type(3) {
  animation-delay: 0.66s;
}
.page:nth-of-type(4) {
  animation-delay: 0.99s;
}
.page:nth-of-type(5) {
  animation-delay: 1.2s;
}
.page:nth-of-type(6) {
  animation-delay: 1.25s;
}
@keyframes bookOpen {
  30% {
    z-index: 999;
  }
  100% {
    transform: rotateY(180deg);
    z-index: 999;
  }
}
@keyframes bookCover {
  30% {
    z-index: 999;
  }
  100% {
    transform: rotateY(180deg);
    z-index: 1;
  }
}

.mirror {
  transform: rotateY(180deg);
}

// scrollbar
.page::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.page::-webkit-scrollbar-track {
  background: #c9c6a4;
}
.page::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}
.page::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.7);
}
.page::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.9);
}

.page {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>