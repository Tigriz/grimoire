<template>
  <section class="container-l">
    <h1>Équipe</h1>
    <section style="text-align: center" v-if="errored">
      <b-alert show variant="danger">Erreur : {{ errored }}</b-alert>
    </section>

    <section v-else>
      <div v-if="loading" class="text-center">
        <b-spinner variant="light" label="Spinning"></b-spinner>
      </div>

      <div v-else class="text-center">
        <card
          v-for="member in team"
          :key="member.pseudo"
          class="m-2"
          :data-image="'img/team/' + member.pseudo.toLowerCase() + '.png'"
        >
          <div slot="content">{{ member.description }}</div>
          <div slot="header">
            {{ member.prenom }}
            <h2 class="px-2">
              <a
                target="_blank"
                style="cursor: help"
                :href="
                  'https://www.iiens.net/etudiants/trombi.php?type_req%5Bsurnom%5D=2&surnom=' +
                  member.pseudo +
                  '&tsub=Rechercher'
                "
                >{{ member.pseudo }}</a
              >
            </h2>
            {{ member.nom }}
          </div>
          <p slot="role" style="margin-bottom: 2rem">{{ member.role }}</p>
        </card>
      </div>
    </section>
  </section>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "Team",
  components: {
    Card,
  },
  data() {
    return {
      team: [],
      loading: true,
      errored: false,
    };
  },
  mounted() {
    fetch("files/team.json")
      .then((response) => {
        if (response.status !== 200) {
          this.errored = response.status;
          return;
        }
        response.json().then((data) => {
          data.forEach((element) => {
            element.active = false;
          });
          this.team = data;
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
h2 > a {
  color: #fff;
}

h2 {
  margin-bottom: -5px !important;
}
</style>