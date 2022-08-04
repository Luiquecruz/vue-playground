<template>
  <div class="container">
    <h1 class="title text-center">Nuxt Fundamentals Blog</h1>

    <section class="posts-wrapper">
      <NLink
        v-for="(post, index) in posts"
        :key="index"
        :to="{ name: 'posts-id', params: { id: post.id } }"
        class="btn"
      >
        {{ post.title }}
      </NLink>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  head() {
    return {
      title: 'Home',
      meta: [
        {
          name: 'Description',
          content: 'Nuxt fundamentals blog',
        },
        {
          name: 'twitter:title',
          content: 'Home',
        },
        {
          name: 'twitter:description',
          content: 'Nuxt fundamentals blog',
        },
        {
          name: 'twitter:image',
          content:
            'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/cc/cc12bce2f1cf5884ea7860d5498427ba988bb4f6_full.jpg',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts.all
    },
  },
}
</script>

<style scoped>
.title {
  display: block;
  color: var(--fg);
  font-size: 10rem;
  font-weight: 600;
  line-height: 125%;

  margin: 4rem 0;
}

.posts-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.posts-wrapper .btn {
  margin: 2rem 0;
}

@media (max-width: 560px) {
  .posts-wrapper {
    flex-direction: column;
    width: 100%;
    margin: 4rem 0;
  }

  .posts-wrapper .btn {
    width: 100%;
  }
}

@media (max-width: 991px) {
  .title {
    font-size: 5rem;
  }
}
</style>
