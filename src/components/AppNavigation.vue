<template>
  <v-bottom-nav
    :value="showNav"
    app
    height="50"
    class="app-navigation"
    style=""
  >
    <v-layout justify-center>
      <container class="app-navigation__container">
        <v-layout justify-center>
          <!-- Wallet -->
          <v-btn
            to="/home"
            flat
          >
            <span>{{ 'Wallets' }}</span>
            <v-icon size="20">
              mdi-wallet
            </v-icon>
          </v-btn>
          <v-btn
            to="/chats"
            flat
          >
            <span>{{ 'chats' }}</span>
            <v-icon size="20">
              mdi-comment-text
            </v-icon>
          </v-btn>

          <!-- Settings -->
          <v-btn
            to="/available"
            flat
          >
            <span>{{ 'Market' }}</span>
            <v-icon size="20">
              mdi-layers-outline
            </v-icon>
          </v-btn>

          <v-btn
            to="/options"
            flat
          >
            <span>{{ 'Settings' }}</span>
            <v-icon size="20">
              mdi-cog
            </v-icon>
          </v-btn>
        </v-layout>
      </container>
    </v-layout>
  </v-bottom-nav>
</template>

<script>
export default {
  data: () => ({
    pages: [
      {
        title: 'wallet',
        link: '/home',
        icon: 'mdi-wallet'
      },
      {
        title: 'Market',
        link: '/available',
        icon: 'mdi-layers-outline'
      },
      {
        title: 'settings',
        link: '/options',
        icon: 'mdi-cog'
      }
    ],
    currentPageIndex: 0,
    showNav: true
  }),
  computed: {
    numOfNewMessages () {
      return this.$store.getters['chat/totalNumOfNewMessages']
    }
  },
  watch: {
    '$route.path' () {
      this.currentPageIndex = this.getCurrentPageIndex()
    }
  },
  mounted () {
    this.currentPageIndex = this.getCurrentPageIndex()
  },
  methods: {
    getCurrentPageIndex () {
      const currentPage = this.pages.find(page => {
        const pattern = new RegExp(`^${page.link}`)

        return this.$route.path.match(pattern)
      })

      return this.pages.indexOf(currentPage)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors.styl'
@import '../assets/stylus/settings/_colors.styl'

/**
 * 1. Navigation Button.
 *    a. Active
 *    b. Inactive
 */
.app-navigation
  &.v-bottom-nav
    box-shadow: none
  &.v-bottom-nav .v-btn // [1]
    font-weight: 300
    padding-bottom: 8px
  >>> .v-btn.v-btn--active // [1.a]
    padding-top: 4px
  >>> .v-btn:not(.v-btn--active) // [1.b]
    filter: unset
    padding-top: 6px
    font-size: 12px

.theme--light
  .app-navigation
    &__container
      border-top: 1px solid $grey.lighten-2
    &.v-bottom-nav
      background-color: $shades.white
    >>> .v-btn.v-btn--active // [1.a]
      color: $adm-colors.regular
    >>> .v-btn:not(.v-btn--active) // [1.b]
      color: $adm-colors.muted !important

.theme--dark
  .app-navigation
    &.v-bottom-nav
      background-color: $shades.black
</style>
