<template>

 <div class="layout justify-center">
      <nav id="nav" class="uk-navbar uk-navbar-container" style="min-height:80px" uk-navbar="">
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav">
            <li>

              <a href="#" style ="color:black; padding-right:0px;" class="uk-icon uk-navbar-toggle-icon" aria-expanded="false"> <v-icon size="20">
              mdi-menu
            </v-icon></a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-bottom-left" style="left: 10px; top: 80px">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li class="uk-active">
                     <router-link
                    :to="{
                      path: '/about'
                    }"
                  aria-expanded="false">
                  <button  class="uk-button uk-button-text" type="button" >About Bridge Market</button>
                      
                    </router-link>
                  </li>
                </ul>
                </div>
                </li>
            <li><router-link to="/">Bridge Market</router-link></li>
          </ul>
        </div>
        <div class="uk-navbar-right"><ul class = "uk-navbar-nav">
           <li>
                   <router-link
                    :to="{
                      path: '/search'
                    }">
                    <span class = "fa fa-search"></span>
                    </router-link>
                   </li>
                       <li>
                   <router-link
                    :to="{
                      path: '/mint'
                    }">
                    <span class = "btn-main"> Mint</span>
                    </router-link>
                   </li>
                  </ul></div>
      </nav>
    </div>
</template>
<script>
export default {
  name: 'bridge-nav',
  data: () => ({
    hide: 'hide',
    name: '',
    newOwner: '',
    price: '',
    url: ''
  }),
 
}
</script>
