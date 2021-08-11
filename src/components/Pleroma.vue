<template>
  <section>
    <section style="text-align: center" v-if="errored">
      <b-alert show variant="danger">Erreur : {{ errored }}</b-alert>
    </section>

    <section v-else>
      <div v-if="loading" style="text-align: center">
        <b-spinner variant="light" label="Spinning"></b-spinner>
      </div>

      <b-card
        class="status my-2"
        no-body
        bg-variant="dark"
        text-variant="white"
        v-for="status in pleroma"
        :key="status.id"
      >
        <b-card-header v-if="status.reblogged">
          <img
            :src="status.reblogged.avatar"
            style="border-radius: 100%"
            height="40"
            width="40"
          />
          {{ status.reblogged.user }}
          <font-awesome-icon :icon="['fas', 'retweet']" />
        </b-card-header>
        <b-card-header v-else v-html="status.user"></b-card-header>
        <b-card-body v-if="status.content">
          <b-card-text v-html="status.content"></b-card-text>
        </b-card-body>
        <b-card-img
          v-for="image of status.medias"
          :key="image.id"
          :src="image.text_url"
          :alt="image.description"
        ></b-card-img>
        <b-card-footer>
          <b-card-text class="d-flex">
            <b-badge variant="dark" v-if="status.replies != 0" class="mx-1 p-2">
              <font-awesome-icon :icon="['fas', 'reply']" />
              {{ status.replies }}
            </b-badge>
            <b-badge variant="dark" v-if="status.reblogs != 0" class="mx-1 p-2">
              <font-awesome-icon :icon="['fas', 'retweet']" />
              {{ status.reblogs }}
            </b-badge>
            <b-badge variant="dark" v-if="status.favs != 0" class="mx-1 p-2">
              <font-awesome-icon :icon="['fas', 'heart']" />
              {{ status.favs }}
            </b-badge>
            <div style="margin-top: 3px" class="small text-muted ml-auto">
              {{ status.date }}
            </div>
          </b-card-text>
        </b-card-footer>
      </b-card>
    </section>
  </section>
</template>

<script>
export default {
  name: "Pleroma",
  data() {
    return {
      pleroma: [],
      loading: true,
      errored: false,
    };
  },
  methods: {
    emoji: function (text, emojis) {
      for (let emoji of emojis) {
        text = text.replace(
          new RegExp(`:${emoji.shortcode}:`, "g"),
          `<img class="emoji" src="${emoji.url}" />`
        );
      }
      return text;
    },
  },
  mounted() {
    fetch(
      "https://sorcie.re/api/v1/accounts/A11C4gHjvkwYeWze7M/statuses?count=20&with_muted=true"
    )
      .then((response) => {
        if (response.status !== 200) {
          this.errored = response.status;
          return;
        }
        response.json().then((data) => {
          for (let status of data) {
            this.pleroma.push({
              user:
                `<img src="${status.account.avatar}" style="border-radius: 100%" height="40" width="40"/> ` +
                this.emoji(status.account.display_name, status.account.emojis),
              id: status.id,
              date: new Date(status.created_at).toLocaleString(),
              content: this.emoji(status.content, status.emojis),
              medias: status.media_attachments,
              replies: status.replies_count,
              reblogs: status.reblogs_count,
              favs: status.favourites_count,
              reblogged: status.reblog
                ? {
                    user: status.reblog.account.display_name,
                    avatar: status.reblog.account.avatar,
                  }
                : null,
            });
          }
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
.emoji {
  width: 20px;
  height: 20px;
  margin: -3px 0 0;
}

.card {
  font-family: "Noto Sans Mono";
}

.card-header {
  font-family: "Qranklestein";
  font-size: 1.4em;
}

.card-img {
  font-weight: 300;
  line-height: 2;
  text-align: center;

  width: 100%;
  height: auto;
  display: block;
  position: relative;
  min-height: 50px;
}

.badge-dark {
  background: var(--purple);
  align-self: center;
}

img:before {
  content: " ";
  display: block;

  position: absolute;
  top: -10px;
  left: 0;
  height: calc(100% + 10px);
  width: 100%;
  background-color: #000;
}

img:after {
  content: "Image not working";
  display: block;
  font-size: 16px;
  font-style: normal;
  color: rgb(100, 100, 100);
  color: #fff;
  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>