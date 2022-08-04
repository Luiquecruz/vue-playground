<template>
  <div class="container">
    <article>
      <h1 class="title">{{ post.title }}</h1>
      <p>
        {{ post.content }}
      </p>
    </article>

    <section class="related-posts">
      <h2 class="subtitle">You might also like...</h2>

      <div class="posts-wrapper">
        <div
          v-for="(related, index) in relatedPosts"
          :key="index"
          class="post-card"
        >
          <h3>{{ related.title }}</h3>

          <p>{{ related.content.substring(0, 50) }}</p>

          <NLink :to="`/posts/${related.id}`" class="btn">Read more</NLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          name: 'Description',
          content: this.post.content,
        },
        {
          name: 'twitter:title',
          content: this.post.title,
        },
        {
          name: 'twitter:description',
          content: this.post.content,
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
    post() {
      return this.$store.state.posts.all.find((post) => post.id === this.id)
    },
    relatedPosts() {
      return this.$store.state.posts.all.filter((post) => post.id !== this.id)
    },
  },
}
</script>

<style scoped>
article {
  margin-bottom: 3rem;
}

article h1 {
  font-size: 3rem;
  letter-spacing: 0.02em;
  margin: 0 0 1.6rem;
}

article p {
  font-size: 1.6rem;
  letter-spacing: 0.02em;
  margin: 0 0 1rem;
}

.related-posts {
  width: 100%;
  margin-top: 6rem;
}

.subtitle {
  font-size: 2.2rem;
  letter-spacing: 0.02em;
  margin: 0 0 3rem;
}

.posts-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.post-card {
  max-width: 280px;
  width: 100%;
  border: 0.1rem solid var(--fg);
  padding: 2rem;
  margin: 2rem 0;
}

.post-card h3 {
  font-size: 1.8rem;
  margin: 0 0 1rem;
}

.post-card p {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
  margin: 0 0 2rem;
}

@media (max-width: 560px) {
  .related-posts {
    margin-bottom: 4rem;
  }

  .post-card {
    max-width: 100%;
  }
}
</style>
