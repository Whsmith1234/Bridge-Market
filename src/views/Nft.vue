<template>
<div>
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
                <input v-model="amount" class="uk-input" type="text" placeholder="Amount">
                <select class="uk-input">
                  <option value="0">Gift</option>
                  <option value="1">Eth</option>
                  <option value="2">BTC</option>
                  <option value="3">ADM</option>
                  <option value="4">DASH</option>
                  <option value="5">Arweave</option>
                  <option value="6">DOGE</option>
                </select>
              </div>
              <div class="uk-margin">
                <input v-model="newOwner" class="uk-input" type="text" placeholder="New Address">
              </div>
              <div class="uk-margin">
                <a v-on:click="transfer(name, newOwner)" class="uk-button uk-button-primary">Transfer your NFT <div :class="hide" uk-spinner></div> </a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
   <bridge-nav/>
   <br><br><br><br><br><br><br>
   <div id="home">
   <h2 id = "title"> Owners of: {{name}} </h2>
   <a :href="url">
   <img :src ="url"/>
   </a>
   <hr/>
   Minted By {{orig}}
    <center>
    <div :class="hide" uk-spinner>Verifying Owner</div>
    </center>
   <div v-for="transfer in transfers" :key="transfer">
       <hr/> {{transfer}}
    </div>
     <hr/>
                    <a :class = "mine" class = "btn-main" uk-toggle="target: #postAd" aria-expanded="false">
                      Post Ad
                    </a>
                    &nbsp;
                    <a :class = "mine" style= "background-color: rgb(13, 12, 34,0.3); !important" class = "btn-main" uk-toggle="target: #transfer" aria-expanded="false">
                      Transfer your NFT
                    </a>
    </div>
                     
  </div>
</template>
<style>
    #title{
        margin-top:-1em;
    }
  *:hover {
    text-decoration: none !important;
  }

  input {
    font-size: 16px !important;
  }

</style>
<style scoped>
  #home {
    width: 90%;
    margin-left: 5%;
  }

  nav {
    position: fixed !important;
    top: 0px;
    left: 0px;
    width: 100vw;
    z-index: 1000;
  }

  #home>center>h1 {
    margin-top: 20px;
  }

  .contents {
    padding: 0 16px;
  }

  img {
    object-fit: cover;
    width: 100%;
    max-height: 15em;
  }

  .uk-table td {
    vertical-align: middle !important;
  }

  .hide {
    display: none;
  }

</style>
<script>
import * as Ar from '@/lib/adamant-api.js'
import {
  EPOCH
} from '@/lib/constants.js'
import BridgeNav from '@/components/BridgeNav.vue'
export default {
  components: { BridgeNav },
  data: () => ({
    hide: 'hide',
    mine: 'hide',
    name: '',
    url: '',
    orig: '',
    transfers: []
  }),
  async mounted () {
    console.log(EPOCH)
    this.hide = ''
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const nft = urlParams.get('name')
    this.name = nft
    const ownerCheck = urlParams.get('owner')
    const orig = urlParams.get('orig')
    if(orig){
    var x = Ar.getStored(nft,orig, 2, 'asc');
    var y = Ar.getStored(nft + '|',orig, 10, 'asc');
    }else{
      var x = Ar.getStoredArray(nft, 2, 'asc');
    }
    var minted = await x;
    console.log(x);    
    this.orig = minted[0].senderId
    var y = Ar.getStored(nft + '|',this.orig, 10, 'asc');
    this.url = minted[0].asset.state.value
    var transfers = await y;
    var currentOwner = minted[0].senderId
    while(transfers.length>0){
      this.transfers.push("Transfered to " + transfers[0].asset.state.value)
      transfers = await  Ar.getStored(nft + '|',transfers[0].asset.state.value, 10, 'asc',0,transfers[0].height);
    }
    this.hide = 'hide'
    if (ownerCheck === currentOwner) {
     this.transfers.push('Verification complete this is the correct owner')
    } else {
      this.transfers.push('They tried to scam you but alas you beat their wits')
    }
   if(currentOwner=== JSON.parse(sessionStorage.adm).address){
     this.mine= '';
   }
  },
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
    transfer: async function (name, newOwner, type=0, currency="ADM", time = 0,amount =0) {
      this.hide = ''
      //name|newOwner|currency|time
      if(type==0){
      await Ar.storeValue(name + '|', newOwner)
      }else{
        await Ar.storeValue(name+'|',newOwner+'|'+currency+'|'+amount+'|'+time)
      }
      this.hide = 'hide'
    }
  }
}
/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
