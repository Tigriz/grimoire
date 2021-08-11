<template>
    <div id="app">
        <router-view name="navbar"></router-view>
        <main>
            <fade-transition :duration="500">
                <router-view/>
            </fade-transition>
        </main>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  }
};
</script>