<template>

  <div class="layout justify-center">
    <div id="modal-full" class=" uk-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-full" type="button" uk-close></button>
        <div class = "uk-search uk-search-large">
            <input v-model = "search" class="uk-search-input uk-text-center" type="search" placeholder="Search" autofocus>
            <center>
            <router-link
                  :to="{
                    path: 'asset',
                    query: { name: search},
                  }"
                  class="uk-button"
                  >Search</router-link
                >
                </center>
              </div>
              
    </div>
</div>
    <nav
      id="nav"
      class="uk-navbar uk-navbar-container"
      style="min-height: 80px"
      uk-navbar=""
    >
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li>
            <a
              href="#"
              style="color: black; padding-right: 0px"
              class="uk-icon uk-navbar-toggle-icon"
              aria-expanded="false"
            >
              <v-icon size="20"> mdi-menu </v-icon></a
            >
            <div
              class="uk-navbar-dropdown uk-navbar-dropdown-bottom-left"
              style="left: 10px; top: 80px"
            >
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li class="uk-active">
                  <router-link
                    :to="{
                      path: '/about',
                    }"
                    aria-expanded="false"
                  >
                    <button class="uk-button uk-button-text" type="button">
                      About Bridge Market
                    </button>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li><router-link to="/">Bridge Market</router-link></li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <a class="uk-navbar-toggle" href="#modal-full" uk-search-icon uk-toggle></a>
          </li>
          <li>
            <router-link
              :to="{
                path: '/mint',
              }"
            >
              <span class="btn-main"> Mint</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "bridge-nav",
  data: () => ({
    hide: "hide",
    name: "",
    newOwner: "",
    price: "",
    url: "",
    search:"",
  }),
};
</script>
