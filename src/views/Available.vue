<template>
  <div>
    <bridge-nav/>
    <div id="home">
      <center>
        <div :class="hide" uk-spinner>Loading the NFTs the first time can take a while</div>
      </center>
      <div class="
              uk-child-width-1-5@xl
              uk-child-width-1-4@l
              uk-child-width-1-3@m
              uk-child-width-1-2@s
              uk-grid
              uk-flex-top
              uk-flex-wrap-top
            " uk-grid="masonry: true" style="height: 953px">
        <div v-for="Ad in Ads" :key="Ad.url" class="uk-first-column" style="transform: translateY(0px)">
          <a :href="'/asset?name=' + Ad.name + '&owner=' + Ad.current">
          <div class="uk-card uk-card-default">
            <div class="uk-card-media-top">
              <img :src="Ad.url" />
              <div class="uk-card-body">
                <h3 class="uk-card-title">{{Ad.name}}</h3>
                <p>
                  Made By:<br /> {{Ad.orig}} <br />
                  Current Owner:<br /> {{Ad.current}}
                </p>
                <a :href="'/?address='+Ad.current+'&message=Hi%20there I would like to buy your NFT for '+Ad.price" class="uk-button uk-button-primary">Price: {{Ad.price}}</a>
                <br/>
                Alternatively if you wish to purchase this in a manner that accepts refunds... message our team to connect with the seller
              </div>
            </div>
          </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  *:hover {
    text-decoration: none !important;
  }

  input {
    font-size: 16px !important;
  }
   nav {
    position: fixed !important;
    top: 0px;
    left: 0px;
    width: 100vw;
    z-index: 1000;
  }
  .hide {
    display: none;
  }

</style>
<style scoped>
  #home {
    width: 90%;
    margin-left: 5%;
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
</style>
<script>
import * as Ar from '@/lib/adamant-api.js'
import { EPOCH } from '@/lib/constants.js'
import BridgeNav from '@/components/BridgeNav.vue'
export default {
  components: { BridgeNav },
  data: () => ({
    hide: 'hide',
    name: '',
    url: '',
    price: '',
    Ads: []
  }),
  async mounted () {
    console.log(Date.now())
    console.log(EPOCH)
    console.log(Date.now() - EPOCH)
    this.Ads = JSON.parse(localStorage.getItem('Ads'))
    try {
      if (this.Ads.length === 0) {
        this.hide = ''
      }
    } catch {
      this.hide = ''
    }
    var Adreserve = []
    var data = await Ar.getStoredArray('ad', 15)
    console.log(data)
    for (var i in data) {
      var x = {}
      x.current = data[i].senderId
      var v = await data[i].asset.state.value.split(':')
      x.name = v[0]
      x.price = v[1]
      if (v.length < 4) {
        // var nft = await Ar.getStoredArray(`${v[0]}`, 2, 'asc')
        // x.orig = nft[0].senderId
        // x.url = nft[0].asset.state.value
        x.orig = 'Old format of ad... Click on the NFT to see the image'
      } else {
        x.orig = v[2]
        x.url = v[3] + ':' + v[4]
      }
      Adreserve.push(x)
    }
    this.Ads = Adreserve
    localStorage.setItem('Ads', JSON.stringify(Adreserve))
    this.hide = 'hide'
  },
  methods: {
  }
}
/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
