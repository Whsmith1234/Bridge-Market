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
      <div id="bid" uk-modal="" class="uk-modal" style="" tabindex="0">
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Post a Bid</h2>
          <form>
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <input v-model="name" class="uk-input" type="text" placeholder="Name of NFT">
              </div>
              <div class="uk-margin">
                <input v-model="amount" class="uk-input" type="text" placeholder="Amount">
                <select v-model ="currency" class="uk-input">
                  <option value="Gift">Gift</option>
                  <option value="Eth">Eth</option>
                  <option value="BTC">BTC</option>
                  <option value="ADM">ADM</option>
                  <option value="DASH">DASH</option>
                  <option value="Arweave">Arweave</option>
                  <option value="DOGE">DOGE</option>
                </select>
              </div>
              <div class="uk-margin">
                <a v-on:click="bid(amount,currency)" class="uk-button uk-button-primary">Bid<div :class="hide" uk-spinner></div> </a>
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
                <input v-model="price" class="uk-input" type="text" placeholder="Amount">
                <select v-model="currency" class="uk-input">
                  <option value="Gift">Gift</option>
                  <option value="Eth">Eth</option>
                  <option value="BTC">BTC</option>
                  <option value="ADM">ADM</option>
                  <option value="DASH">DASH</option>
                  <option value="Arweave">Arweave</option>
                  <option value="DOGE">DOGE</option>
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
    <div v-for="bid in bids" :key="bid">
       <hr/><a v-on:click="inputBid(bid)" :class = "mine" style= "background-color: rgb(13, 12, 34,0.3); !important" class = "btn-main" uk-toggle="target: #transfer" aria-expanded="false">
                      {{bid[1]}} &nbsp; {{bid[2]}}
       </a> {{bid}}
    </div>
     <hr/>
                    <a class = "btn-main" uk-toggle="target: #bid" aria-expanded="false">
                      Bid
                    </a>
                     &nbsp;
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
import { hexToBytes, bytesToHex } from '@/lib/hex'
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
    transfers: [],
    bids: [],
    price : 0,
    currency: "Adm",
    currentOwner : "",
    newOwner: ""
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
      if(transfers[0].asset.state.value.split("|").length<2){ //If the transfer is a gift
        this.transfers.push("Transfered to " + transfers[0].asset.state.value)
        transfers = await  Ar.getStored(nft + '|',transfers[0].asset.state.value, 10, 'asc',0,transfers[0].height);
      }else{
        if(transfers[0].asset.state.value.split("|").length==5){
          var currentTransfer = transfers[0].asset.state.value.split("|");
          var currency = currentTransfer[2];
          var amount = currentTransfer[3];
          var time = currentTransfer[4];
          var owner = currentOwner;
          var newOwner = currentTransfer[1]; 
          var name = currentTransfer[0];
          var txId = await  Ar.getStored(nft + '|',transfers[0].asset.state.value, 10, 'asc',0,transfers[0].height);
          var tx;
          switch(currency){
            case "ADM":
              tx = await checkAdamant(amount, time, owner, newOwner, name, txId); 
            break;
            case "BTC":
              tx = await checkBTC(amount, time, owner, newOwner, name, txId); 
            break;
            case "Arweave":
              tx = await checkArweave(amount, time, owner, newOwner, name, txId); 
            break;
            case "Eth":
              tx = await checkEth(amount, time, owner, newOwner, name, txId); 
            break;
            case "Dash":
              tx = await checkDash(amount, time, owner, newOwner, name, txId); 
            break;
            case "DOGE":
              tx = await checkDOGE(amount, time, owner, newOwner, name, txId); 
            break;
          }
        }
      }
      
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
    this.currentOwner = currentOwner;
    var data = await Ar.getChatsB(currentOwner);
    var enc = new TextDecoder();
    var v =[];
    for(var i in data){
      v[i]= await enc.decode(hexToBytes(data[i].asset.chat.message)).split("|");
    }
     for(var i =0;i<v.length;i++){
       this.bids.push(v[i]);
     }
    console.log(data);
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
    },
    bid: async function(amount,currency){
      console.log("bid")
      var h =await Ar.sendMessageB({to:this.currentOwner, message: this.name+'@|'+currency+'|'+amount+'|'+ JSON.parse(sessionStorage.adm).address});
      console.log(h)
      console.log(this.currentOwner);
    },
    inputBid: function(bid){
      this.price = bid[2]
      this.newOwner = bid[3]
      this.currency = bid[1]
    }
  }
}
/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
