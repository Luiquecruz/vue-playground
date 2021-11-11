<template>
  <div
    id="app"
    :class="typeof data.main !== 'undefined' && data.main.temp > 18 ? 'warm' : ''"
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="data.main !== undefined">
        <div class="location-box">
          <p class="location">{{ data.name }}, {{ data.sys.country }}</p>
          <time class="date">Monday 20 January 2020</time>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(data.main.temp) }}°c</div>
          <div class="weather">{{ data.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      api_key: "c6388fe11133685ebd92b7ef45526c27",
      url_base: "api.openweathermap.org/data/2.5/weather",
      query: "",
      data: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key === "Enter") {
        fetch(
          `${this.url_base}?q=${this.query}&units=metric&appid=${this.api_key}`
        )
          .then((res) => res)
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.data = results;
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
}

#app {
  background-image: url("assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url("/assets/warm-bg.jpg");
}

main {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
  min-height: 100vh;
  padding: 25px;
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  color: #313131;
  font-size: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  outline: none;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  border-radius: 100px;
  padding: 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  background-color: rgba(255, 255, 255, 0.75);
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
