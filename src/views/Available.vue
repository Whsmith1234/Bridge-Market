<template>
  <div>
    <bridge-nav />
   
    <div
      class="large owl-item active uk-inline"
      style="width: 100%; margin-left: 0%; min-height:calc(100vh);"
    >
     
      <div class="nft__item_lg uk-position-center" style="width:90vw">
        <div class="row align-items-center" style="">
          <div class="col-sm-6" style="background-size: cover">
            <center>
            <img
              style="max-height: 50vh !important;"
              :src="Ads[0].url"
              class="img-fluid"
              alt=""
              id="mainImage"
            />
            </center>
          </div>
          <div class="col-sm-6" style="background-size: cover">
            <div
              class="d-desc"
              style="padding: 0 !important; background-size: cover;"
            >
              <h2 style = " margin-top:0px !important;">{{ Ads[0].name }}</h2>
              <div class="d-author" style="background-size: cover">
                <div class="author_list_pp" style="background-size: cover">
                  <a
                    data-savepage-href="author.html"
                    href="https://gigaland.io/author.html"
                  >
                    <img
                      class="lazy"
                      :src="
                        'https://robohash.org/' +
                        Ads[0].current +
                        '.png?set=set4&size=150x150'
                      "
                      alt=""
                    />
                    <i class="fa fa-check"></i>
                  </a>
                </div>
                <div class="author_list_info" style="background-size: cover">
                  <a>BridgeMarket NFTs</a><br>
                  <span>{{ Ads[0].current }}</span>
                </div>
              </div>
              
              <div class="d-attr" style="background-size: cover">
                <div style="background-size: cover">
                  <span class="d-title">Price</span>
                  <h3>{{ Ads[0].price }}</h3>
                </div>
                <div style="background-size: cover">
                  <span class="d-title">Auction ends in</span>
                  <div
                    class="de_countdown is-countdown"
                    data-year="2021"
                    data-month="12"
                    data-day="18"
                    data-hour="8"
                    style="background-size: cover"
                  >
                    <span class="countdown-row countdown-show4"
                      ><span class="countdown-section"
                        ><span class="countdown-amount">{{parseInt((date/(3600*24)))}}d</span></span
                      ><span class="countdown-section"
                        ><span class="countdown-amount">{{parseInt((date%(3600*24))/(3600))}}h</span></span
                      ><span class="countdown-section"
                            ><span class="countdown-amount">{{parseInt((date%3600)/(60))}}m</span></span
                      ><span class="countdown-section"
                        ><span class="countdown-amount">{{parseInt(date%60)}}s</span></span
                      ></span
                    >
                  </div>
                  <h5>{{(formatdate)}}</h5>
                </div>
              </div>
              <div class="spacer-10" style="background-size: cover"></div>
              <div class="d-buttons" style="background-size: cover">
                <router-link
                  :to="{
                    path: 'asset',
                    query: { name: Ads[0].name, owner: Ads[0].current, orig:Ads[0].orig},
                  }"
                  class="btn-main"
                  >Buy</router-link
                >&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="home">
      <br />
      <center>
        <div :class="hide" uk-spinner>
          Loading the NFTs the first time can take a while <br /><br /><br />
        </div>
      </center>
      <div class="col-lg-12" style="background-size: cover">
        <div class="text-center" style="background-size: cover">
          <br><br><br>
         <center> <h1 id="title">Current NFTs for sale</h1> </center>
        </div>
      </div>
      <div >
      <ul class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid="masonry: true">
        <div
          uk-scrollspy="cls:uk-animation-fade; repeat: true"
          v-for="Ad in Ads"
          :key="Ad.name+Ad.price+Ad.current"
          class="uk-first-column"
          style="transform: translateY(0px)"
        >
        
          <div class="owl-item active" style="width: 100%; margin-right: 25px">
            <div class="d-item" style="display: block; background-size: cover">
              <div class="nft__item" style="background-size: cover">
                <div class="author_list_pp" style="background-size: cover">
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Creator: Stacy Long"
                  >
                    <img
                      class="lazy"
                      :src="
                        'https://robohash.org/' +
                        Ad.current +
                        '.png?set=set4&size=150x150'
                      "
                    />
                    <i class="fa fa-check"></i>
                  </a>
                </div>
                <span style="float: right; width: 70%; margin-top: 12px">{{
                  Ad.current
                }}</span>
                <div
                  class="nft__item_wrap"
                  style="background-size: cover; height: 100%"
                >
                  <div
                    class="nft__item_extra"
                    style="background-size: cover"
                  ></div>
                  <router-link
                    :to="{
                      path: 'asset',
                      query: { name: Ad.name, owner: Ad.current, orig:Ad.orig },
                    }"
                  >
                    <img :src="Ad.url" />
                  </router-link>
                </div>
                <div class="nft__item_info" style="background-size: cover">
                  <router-link
                    :to="{
                      path: 'asset',
                      query: { name: Ad.name, owner: Ad.current, orig:Ad.orig },
                    }"
                  >
                    <h4>{{ Ad.name }}</h4>
                  </router-link>
                  <div class="nft__item_price" style="background-size: cover">
                    Made By: {{ Ad.orig }}
                  </div>
                  <div class="nft__item_price" style="background-size: cover">
                    {{ Ad.price }}
                  </div>
                  <div class="nft__item_action" style="background-size: cover">
                    <router-link
                      :to="{
                        path: 'asset',
                        query: { name: Ad.name, owner: Ad.current, orig: Ad.orig },
                      }"
                      >Buy</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
      </div>
      <br>
    </div>
  </div>
</template>
<style>
a{
  text-decoration-color: none !important;
  color:black;
}
nav {
  background-color: white !important;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 1vw;
  padding: 0;
  list-style-type: none;
}
.card {
  position: relative;
  display: block;
  height: 100%;
  max-height:50vh !important;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
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
body {
  overflow-x: hidden !important;
}
</style>
<style scoped>
#home {
  margin-top: 20px;
  width: 90%;
  margin-left: 5%;
}
</style>
<script>
import { hexToBytes, bytesToHex } from '@/lib/hex'
import * as Ar from "@/lib/adamant-api.js";
import { EPOCH } from "@/lib/constants.js";
import BridgeNav from "@/components/BridgeNav.vue";
export default {
  components: { BridgeNav },
  data: () => ({
    formatdate:"",
    date: 1000,
    hide: "hide",
    name: "",
    url: "",
    price: "",
    Ads: [{url:"https://images.unsplash.com/photo-1618913001606-b4d858e24d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg4fHxhcnR3b3JrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", name:"Loading NFTs", price:"FREE"}],
  }),
  async mounted() {
    var data = await Ar.getChatsB();
    var enc = new TextDecoder();
    console.log(data);
    // console.log(Date.now());
    // console.log(EPOCH);
    // console.log(Date.now() - EPOCH);
    //this.Ads = JSON.parse(localStorage.getItem("Ads"));
    try {
      if (this.Ads.length === 0) {
        this.hide = "";
      }
    } catch {
      this.hide = "";
    }
    var Adreserve = [];
    console.log(data);
    for (var i in data) {
      var x = {};
      x.current = data[i].senderId;
      
      var v = await enc.decode(hexToBytes(data[i].asset.chat.message)).split("|");
      x.name = v[0];
      x.price = v[1];
      if (v.length < 4) {
        // var nft = await Ar.getStoredArray(`${v[0]}`, 2, 'asc')
        // x.orig = nft[0].senderId
        x.url =
          "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
        x.orig = "Old format of ad... Click on the NFT to see the image";
      } else {
        x.orig = v[2];
        x.url = v[3];
      }
      Adreserve.push(x);
    }
     this.Ads = Adreserve;
     //localStorage.setItem("Ads", JSON.stringify(Adreserve));
     this.hide = "hide";
    // this.formatdate = (new Date((Math.floor(Date.now()/1000)+this.date)*1000));
  }
};
/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
