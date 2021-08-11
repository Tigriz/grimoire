<template>
  <section class="fullscreen">
    <div class="center-vertical text-center fullscreen">
      <h1 id="name">
        <img
          :src="publicPath + 'img/logo.png'"
          id="logo"
        />walpurgis<br /><font-awesome-icon :icon="['fas', 'chevron-down']" />
      </h1>
    </div>
    <b-container fluid="md" class="mb-3">
      <b-jumbotron
        bg-variant="transparent"
        text-variant="light"
        header="Bienvenue chez les sorcières !"
        lead="Walpurgis vous accueille pour rendre cette campagne magique !"
      >
      </b-jumbotron>
      <b-row>
        <b-col md="8"><pleroma></pleroma></b-col>
        <b-col md="4">
          <router-link to="/grimoire">
            <div class="book">
              <span class="page turn"></span>
              <span class="page turn"></span>
              <span class="page turn"></span>
              <span class="page turn"></span>
              <span class="page turn"></span>
              <span class="page turn" style="overflow-y: hidden">
                <div class="mirror glyph">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
                  veritatis vel laudantium repudiandae rem eum praesentium
                  debitis adipisci, molestiae consequatur molestias illo
                </div></span
              >
              <span class="cover"></span>
              <span class="page text-center">
                <img
                  :src="publicPath + 'img/logo.png'"
                  width="100"
                  style="filter: drop-shadow(0 0 15px #000)"
                />
                <br />
                Vers le programme
              </span>
              <span class="cover turn"></span>
            </div>
          </router-link>
          <br />
          <p class="text-center">
            <card
              class="m-2 text-center"
              :data-image="publicPath + 'img/team/cover.jpg'"
            >
              <div slot="header">
                <h3 class="px-2">
                  <router-link to="/festivites">Aujourd'hui</router-link>
                </h3>
              </div>
              <p slot="role">{{ this.event.name }}</p>
              <p slot="content">{{ this.event.description }}</p>
            </card>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import Pleroma from "../components/Pleroma.vue";
import Card from "../components/Card.vue";

export default {
  name: "Home",
  components: {
    Pleroma,
    Card,
  },
  data() {
    return {
      today: new Date(),
      event: {},
      loading: true,
      errored: false,
      publicPath: process.env.BASE_URL,
    };
  },
  mounted() {
    fetch("files/calendar.json")
      .then((response) => {
        if (response.status !== 200) {
          this.errored = response.status;
          return;
        }
        response.json().then((data) => {
          data.forEach((element) => {
            element.date = new Date(element.date);
            if (this.today.getDate() == element.date.getDate()) {
              this.event = element;
            }
          });
          this.loading = false;
        });
      })
      .catch((err) => {
        this.errored = err;
      });
  },
};
</script>

<style scoped lang="scss">
//https://learnvue.co/2020/04/a-beautiful-parallax-scrolling-effect-in-vuejs-daily-vue-tips-2/
#logo {
  height: 20vw;
  animation: pulsating 5s infinite;
}

#name {
  font-family: "Fette Haenel Fraktur";
  color: #5c56f5;
  text-shadow: 0 0 5px #5c56f5;
  font-size: 10vw;
  z-index: 1000;
  margin: -100%;
}

.fa-chevron-down {
  font-size: 7vh;
  color: #fff;
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

///// grimoire
.book {
  margin: auto;
  width: 100%;
  max-width: 400px;
  height: 300px;
  perspective: 70rem;
}
.cover {
  background-color: #36354e;
  transform: rotateY(0deg);
  width: 50%;
  height: 100%;
}

.glyph {
  font-family: "Madoka Runes";
}
.page {
  background-color: #e9e6c4;
  transform: rotateY(0deg);
  width: 50%;
  height: 100%;
  text-align: left;
  font-size: 1em;
  color: #666;
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

h3 {
  font-family: "Qranklestein" !important;
  font-size: 1.8em !important;
}
</style>
