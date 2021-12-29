<template>
    <div class="layout justify-center">
      <div id="modal-example" uk-modal="" class="uk-modal" style="" tabindex="0">
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">BridgeMarket NFTs</h2>
          <p>Hello! Bridge Market is a new kind of NFT Market which allows you to buy and sell NFTs across multiple crypto-currencies. The protocol we have in place is completely decentralized and can be built on top of using an api coming out soon. The interface we have abstracts away the mess to give you a clean experience.</p>
          <p>We hope you enjoy.</p>
          <p>Bridge Market</p>
          <p><br></p>
        </div>
      </div>
      <div id="newForm" uk-modal="" class="uk-modal" style="" tabindex="0">
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Mint an NFT</h2>
          <form>
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <input v-model="name" class="uk-input" type="text" placeholder="Name">
              </div>
              We recomment using a service like <a href="https://imgur.com/upload">imgur</a> or <a href="https://postimages.org/">postimages</a>. If you then open the uploaded image in a new tab it will often give the link to the image ending in .jpg or some other png format. To check this worked see if the image comes up under the form.
              <div class="uk-margin">
                <input v-model="url" class="uk-input" type="text" placeholder="Image url...">
              </div>
              <div class="uk-margin">
                <a v-on:click="mint(name, url)" class="uk-button uk-button-primary">Mint your NFT <div :class="hide" uk-spinner></div> </a>
              </div>
              <img :src="url" />
            </fieldset>
          </form>
        </div>
      </div>
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
                    <li>
                    <a class="" uk-toggle="target: #newForm" aria-expanded="false">
                    <span class = "btn-main"> Mint</span>
                    </a>
                  </li>
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
    mint: async function (name, url) {
      this.hide = ''
      var data = await Ar.getStoredArray(name, 2)
      console.log(data)
      if (data.length === 0) {
        Ar.storeValue(name, url)
        alert('Your NFT has been minted!')
      } else {
        alert('Name already taken sorry')
      }
      this.hide = 'hide'
    },
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
