<template>
  <nav class="navbar navbar-expand-md bg-body-secondary border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Arko Playlists</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <div class="navbar-nav ms-auto">
          <RouterLink class="nav-link" active-class="active" :to="{ name: 'Home' }"
            >Home</RouterLink
          >
          <RouterLink class="nav-link" active-class="active" :to="{ name: 'Login' }"
            >Login</RouterLink
          >
          <RouterLink class="nav-link" active-class="active" :to="{ name: 'Signup' }"
            >Signup</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>
