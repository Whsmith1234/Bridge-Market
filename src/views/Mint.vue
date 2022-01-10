<<<<<<< HEAD
<template>
  <div>
   <bridge-nav/>
   <br><br><br><br><br><br><br>
   <div id="home">
       <div class = "container">
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
</div>
</template>
<script>
import * as Ar from '@/lib/adamant-api.js'
import BridgeNav from '@/components/BridgeNav.vue'
export default {
    components: { BridgeNav },
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
  }
}
/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
=======
input name
input url or store in arweve for permanent storage and premium NFT
Make this page avilable to authenticated users.
>>>>>>> b1d55af8625dad8d5a5c3230dd78cb66761c04b7
