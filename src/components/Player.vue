<template>
  <div>
    <!-- <b-nav-item class="text-center" to="/playlist">
      <font-awesome-icon :icon="['fas', 'stream']" />
    </b-nav-item> -->
    <!-- <b-nav-item @click="prev()" class="text-center">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </b-nav-item> -->
    <b-nav-item @click="pause()" title="Play" class="text-center px-3 px-md-0">
      <font-awesome-icon
        :icon="['fas', paused ? 'volume-mute' : 'volume-up']"
      />
    </b-nav-item>
    <!-- <b-nav-item @click="next()" class="text-center">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </b-nav-item> -->
    <audio
      @ended="next()"
      :src="playlist[0]"
      preload="auto"
      style="display: none"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    playlist: {
      type: Array,
      default: null,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loaded: false,
      paused: true,
      audio: undefined,
      track: 0,
    };
  },
  methods: {
    play: function () {
      this.paused = false;
      this.audio.play();
    },
    pause: function () {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    next: function () {
      this.track = (this.track + 1) % this.playlist.length;
      this.audio.src = this.playlist[this.track];
      this.audio.play();
    },
    prev: function () {
      if (this.audio.currentTime > 5) {
        this.audio.currentTime = 0;
      } else {
        this.track =
          (this.track + this.playlist.length - 1) % this.playlist.length;
        this.audio.src = this.playlist[this.track];
        this.audio.play();
      }
    },
    _handleLoaded: function () {
      if (this.audio.readyState >= 2) {
        if (this.autoPlay) this.play();

        this.loaded = true;
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayPause: function (e) {
      if (e.type === "pause" && this.playing === false) {
        this.paused = true;
      }
    },
    init: function () {
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
    },
    getAudio: function () {
      return this.$el.querySelectorAll("audio")[0];
    },
  },
  mounted: function () {
    this.audio = this.getAudio();
    this.innerLoop = this.loop;
    this.init();
  },
  beforeDestroy: function () {
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
  },
};
</script>

<style scoped lang="scss">
.navbar-dark .navbar-nav .nav-link:hover,
li:hover .brand {
  color: #fff;
  opacity: 1;
}

li svg {
  transition: 0.25s;
}
li:hover svg,
li:hover .brand {
  filter: drop-shadow(-4px 4px 15px var(--blue)) drop-shadow(4px -4px 15px var(--purple));
}
</style>
