<template>
  <Header />

  <Alert message="Alert message" />
  <Alert alert-type="success" message="Success! It works" />
  <Alert alert-type="warning" message="Warning! It can be better" />
  <Alert alert-type="error" message="Baaaannm! Error, it is wrong" />
  <Alert alert-type="info" message="Did you know Vue is awesome?" />

  <main>
    <slot />
  </main>
</template>
