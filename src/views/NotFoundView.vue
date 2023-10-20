<template>
  <div class="d-flex justify-content-center text-center mt-3 pt-3">
    <div class="card p-4">
      <h2>404</h2>
      <h3 class="fw-normal">Page Not Found</h3>
      <RouterLink :to="{ name: 'Home' }" class="btn btn-primary mt-3"
        >Return Home</RouterLink
      >
    </div>
  </div>
</template>
