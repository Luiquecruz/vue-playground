<template>
  <header class="header">
    <div class="header-group">
      <nav class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <img
            src="../../assets/images/logo_white.png"
            alt="logo"
            class="w-full"
          />
        </div>

        <div class="flex">
          <button
            class="px-6 py-2 font-bold text-white rounded-full focus:outline-none"
            @click="() => emit('createAccount')"
          >
            Crie uma conta
          </button>

          <button
            class="px-6 py-2 font-bold text-brand-main bg-white rounded-full focus:outline-none"
            @click="() => emit('login')"
          >
            Entrar
          </button>
        </div>
      </nav>

      <section class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedback. <br />
          E faça seus clientes mais <br class="hidden lg:inline-block" />
          felizes!
        </h1>

        <p class="text-lg font-medium text-white mt-2">
          Receba ideias, reclamações e feedbacks com um
          <br class="hidden lg:inline-block" />
          simples widget na página.
        </p>

        <button
          class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main focus:outline-none"
          style="max-width: 220px"
          @click="() => emit('createAccount')"
        >
          Crie uma conta grátis
        </button>
      </section>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CustomHeader',
  setup(_, { emit }) {
    return { emit }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue_balloons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
