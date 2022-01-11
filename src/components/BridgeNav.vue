<template>
    <div class="layout justify-center">
      <div id="postAd" uk-modal="" class="uk-modal" style="" tabindex="0">
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Post a Public Ad for your Nft</h2>
          <form>
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <input v-model="name" class="uk-input" type="text" placeholder="Name of NFT">
              </div>
              <div class="uk-margin">
                <input v-model="price" class="uk-input" type="text" placeholder="Price: Ex 3 BTC">
              </div>
              <div class="uk-margin">
                <a v-on:click="postAd(name, price)" class="uk-button uk-button-primary">Post Your Ad <div :class="hide" uk-spinner></div> </a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div id="transfer" uk-modal="" class="uk-modal" style="" tabindex="0">
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Transfer your NFT</h2>
          <form>
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <input v-model="name" class="uk-input" type="text" placeholder="Name of NFT">
              </div>
              <div class="uk-margin">
                <input v-model="newOwner" class="uk-input" type="text" placeholder="New Adress">
              </div>
              <div class="uk-margin">
                <a v-on:click="transfer(name, newOwner)" class="uk-button uk-button-primary">Transfer your NFT <div :class="hide" uk-spinner></div> </a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
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
                  <li class="uk-nav-header">Actions</li>
                  <li>
                    <a uk-toggle="target: #newForm" aria-expanded="false">
                      Mint NFT
                    </a>
                  </li>
                  <li>
                    <a uk-toggle="target: #postAd" aria-expanded="false">
                      Post Ad
                    </a>
                  </li>
                   <li>
                    <a uk-toggle="target: #transfer" aria-expanded="false">
                      Transfer your NFT
                    </a>
                  </li>
                </ul>
                </div>
                </li>
            <li><router-link to="/">Bridge Market</router-link></li>
          </ul>
        </div>
        <div class="uk-navbar-right"><ul class = "uk-navbar-nav">
                    <li>
                    <a class="" uk-toggle="target: #postAd" aria-expanded="false">
                      <span class = "r1"> Post</span>
                    </a>
                  </li>
                   <router-link
                    :to="{
                      path: '/mint'
                    }">
                       <li>
                    <a class="" aria-expanded="false">
                    <span class = "btn-main"> Mint</span>
                    </a>
                  </li>
                    </router-link>
                   
                  </ul></div>
      </nav>
    </div>
</template>
<script>
import * as Ar from '@/lib/adamant-api.js'
export default {
  name: 'bridge-nav',
  data: () => ({
    hide: 'hide',
    name: '',
    newOwner: '',
    price: '',
    url: ''
  }),
  methods: {
    postAd: async function (name, price) {
      this.hide = ''
      var nft = await Ar.getStoredArray(name, 2, 'asc')
      name = name + '|' + price + '|' + nft[0].senderId + '|' + nft[0].asset.state.value
      console.log(name);
      await Ar.sendMessageB({to:"U18074128740382246868", message:name})
      this.hide = 'hide'
      alert('NFT ad made!')
    },
    transfer: async function (name, newOwner) {
      this.hide = ''
      await Ar.storeValue(name + '|', newOwner)
      this.hide = 'hide'
    }
  }
}
</script>
