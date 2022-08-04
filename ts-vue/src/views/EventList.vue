<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="(event, index) in events" :key="index" :event="event" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { EventItem } from '@/types'

import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'

export default defineComponent({
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: Object as PropType<EventItem>
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
})
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
