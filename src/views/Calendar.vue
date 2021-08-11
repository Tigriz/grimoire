<template>
  <section class="container-l">
    <h1>Calendrier</h1>
    <section style="text-align: center" v-if="errored">
      <b-alert show variant="danger">Erreur : {{ errored }}</b-alert>
    </section>

    <section v-else>
      <div v-if="loading" class="text-center">
        <b-spinner variant="light" label="Spinning"></b-spinner>
      </div>

      <div v-else class="text-center">
        <card
          v-for="day in calendar"
          :key="day.date.getTime()"
          class="m-2"
          :data-image="today.getTime()>=day.date.getTime()?publicPath+'img/team/cover.jpg':''"
        >
          <div slot="header">
            <h3 class="px-2">
              {{
                verboseDay(day.date.getDay()) +
                " " +
                day.date.getDate() +
                " " +
                verboseMonth(day.date.getMonth())
              }}
            </h3>
          </div>
          <p slot="role">{{ day.name }}</p>
          <p slot="content">{{ day.description }}</p>
        </card>
      </div>
    </section>
  </section>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "Calendar",
  components: {
    Card,
  },
  data() {
    return {
      today: new Date(),
      calendar: [],
      loading: true,
      errored: false,
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    verboseMonth: function (month) {
      switch (month) {
        case 0:
          return "Janvier";
        case 1:
          return "Février";
        case 2:
          return "Mars";
        case 3:
          return "Avril";
        case 4:
          return "Mai";
        case 5:
          return "Juin";
        case 6:
          return "Juillet";
        case 7:
          return "Août";
        case 8:
          return "Septembre";
        case 9:
          return "Octobre";
        case 10:
          return "Novembre";
        case 11:
          return "Décembre";
      }
    },
    verboseDay: function (month) {
      switch (month) {
        case 1:
          return "Lundi";
        case 2:
          return "Mardi";
        case 3:
          return "Mercredi";
        case 4:
          return "Jeudi";
        case 5:
          return "Vendredi";
        case 6:
          return "Samedi";
        case 0:
          return "Dimanche";
      }
    },
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
          });
          this.calendar = data;
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
h3 {
  font-family: "Qranklestein" !important;
  font-size: 1.2em !important;
}

.card-info {
  padding: 5px !important;
  bottom: 10px !important;
}
</style>