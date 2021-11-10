<template>
  <div>
   <bridge-nav/>
   <div id="home">
   <h2 id = "title"> Owners of: {{name}} </h2>
   <a :href="url">
   <img :src ="url"/>
   </a>
   Minted By {{orig}}
    <center>
    <div :class="hide" uk-spinner>Verifying Owner</div>
    </center>
   <div v-for="transfer in transfers" :key="transfer">
       Transfered to {{transfer}} <br/>
    </div>
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
    var minted = await Ar.getStoredArray(nft, 2, 'asc')
    this.orig = minted[0].senderId
    this.url = minted[0].asset.state.value
    var transactionSlice = await Ar.getStoredArray(nft + '|', 100, 'asc')
    var transfers = []
    var n = 1
    while (true) {
      try {
        if (transactionSlice.length > 99) {
          transfers = transfers.concat(transactionSlice)
          transactionSlice = await await Ar.getStoredArray(nft + '|', 100, 'asc', 100 * n)
          n++
        } else {
          transfers = transfers.concat(transactionSlice)
          break
        }
      } catch {
        break
      }
    }
    var currentOwner = minted[0].senderId
    this.transfers = []
    console.log(transfers)
    for (var i = 0; i < transfers.length; i++) {
      if (transfers[i].senderId === currentOwner) {
        this.transfers.push(transfers[i].asset.state.value)
        currentOwner = transfers[i].asset.state.value
      }
    }
    console.log(ownerCheck)
    console.log(currentOwner)
    this.hide = 'hide'
    if (ownerCheck === currentOwner) {
      alert('Verification complete this is the correct owner')
    } else {
      alert('They tried to scam you but alas you beat their wits')
    }
    // console.log(data)
    // for (var i in data) {
    //   var x = {}
    //   x.current = data[i].senderId
    //   var v = await data[i].asset.state.value.split(':')
    //   x.name = v[0]
    //   x.price = v[1]
    //   if (v.length < 4) {
    //     // var nft = await Ar.getStoredArray(`${v[0]}`, 2, 'asc')
    //     // x.orig = nft[0].senderId
    //     // x.url = nft[0].asset.state.value
    //   } else {
    //     x.orig = v[2]
    //     x.url = v[3] + ':' + v[4]
    //   }
    //   Adreserve.push(x)
    // }
    // this.Ads = Adreserve
    // localStorage.setItem('Ads', JSON.stringify(Adreserve))
    // this.hide = 'hide'
  },
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
      name = name + ':' + price + ':' + nft[0].senderId + ':' + nft[0].asset.state.value
      await Ar.storeValue('ad', name)
      this.hide = 'hide'
    },
    transfer: async function (name, newOwner) {
      this.hide = ''
      await Ar.storeValue(name + '|', newOwner)
      this.hide = 'hide'
    }
  }
}
/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
