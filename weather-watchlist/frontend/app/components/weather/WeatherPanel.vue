<script setup lang="ts">
import type { WeatherReport } from '~/types/weather'

const props = defineProps<{
  report: WeatherReport | null
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{ refresh: [cityId: number] }>()

const condition = computed(() => (props.report ? describeWeatherCode(props.report.weather.weatherCode) : null))
</script>

<template>
  <section class="weather-panel" aria-live="polite">
    <BaseAlert v-if="error">{{ error }}</BaseAlert>
    <div v-else-if="loading && !report" class="weather-panel__placeholder">
      <BaseSpinner label="Loading weather" />
    </div>
    <template v-else-if="report && condition">
      <header class="weather-panel__header">
        <div>
          <h2>{{ report.city.name }}</h2>
          <p>{{ report.city.country }} · {{ report.weather.timezone }}</p>
        </div>
        <span v-if="report.cached" class="weather-panel__badge" data-testid="cache-badge">served from cache</span>
      </header>
      <p class="weather-panel__temperature">
        <span aria-hidden="true">{{ condition.icon }}</span>
        {{ Math.round(report.weather.temperature) }}°C
      </p>
      <p class="weather-panel__condition">{{ condition.label }}</p>
      <dl class="weather-panel__metrics">
        <WeatherMetric label="Feels like" :value="`${Math.round(report.weather.apparentTemperature)}°C`" />
        <WeatherMetric label="Humidity" :value="`${report.weather.humidity}%`" />
        <WeatherMetric label="Wind" :value="`${report.weather.windSpeed} km/h`" />
        <WeatherMetric label="Observed at" :value="report.weather.observedAt.replace('T', ' ')" />
      </dl>
      <div class="weather-panel__actions">
        <BaseButton variant="ghost" :loading="loading" @click="emit('refresh', report.city.id)">Refresh</BaseButton>
      </div>
    </template>
    <p v-else class="weather-panel__placeholder">Select a city to see its current weather.</p>
  </section>
</template>

<style scoped>
.weather-panel {
  display: grid;
  gap: 1rem;
  align-content: start;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  padding: 1.5rem;
  min-height: 18rem;
}

.weather-panel__placeholder {
  display: grid;
  place-items: center;
  min-height: 14rem;
  margin: 0;
  color: var(--color-muted);
}

.weather-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.weather-panel__header h2 {
  margin: 0;
}

.weather-panel__header p {
  margin: 0.2rem 0 0;
  color: var(--color-muted);
  font-size: 0.875rem;
}

.weather-panel__badge {
  border-radius: 999px;
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.weather-panel__temperature {
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
}

.weather-panel__condition {
  margin: -0.5rem 0 0;
  color: var(--color-muted);
}

.weather-panel__metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 0.5rem;
  margin: 0;
}

.weather-panel__actions {
  display: flex;
}
</style>
