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
              <br/>
              Or use <a href="https://arweave.org">Arweave</a> to make a premium NFT which can not be taken down. <br>
              <input id = "docpicker" type="file"/>
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
import Arweave from 'arweave';
// Or manually specify a host
const arweave = Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
});

export default {
    components: { BridgeNav },
    data: () => ({
    hide: 'hide',
    name: '',
    newOwner: '',
    price: '',
    url: ''
  }),
  mounted: async function(){
    sessionStorage.url= 0;
    console.log(this);
    var file = document.getElementById("docpicker");
    console.log(file);
    file.addEventListener("change", this.importFile);
  },
  methods: {
      importFile : async function(evt){
        this.uploadFile();
        console.log(this);
        var files = evt.target.files;
        var reader = new FileReader();
          reader.onload = async function () {
              if (reader.result) {
                var h = (Buffer.from(reader.result,ArrayBuffer));
              }
              let transaction = await arweave.createTransaction({
                    data:h
              });
              transaction.addTag('Content-Type', 'image/png');
              await arweave.transactions.sign(transaction);
              if(confirm("Would you like to upload this picture to Arweave?")){
              let uploader = await arweave.transactions.getUploader(transaction);

              while (!uploader.isComplete) {
               await uploader.uploadChunk();
               console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
            }
              sessionStorage.url='https://arweave.net/'+transaction.id;
          }else{
            
          }
            };
            reader.readAsArrayBuffer(files[0]);
      },
      uploadFile: async function(){
        let promise = new Promise( (resolve, reject) => {
                let interval = setInterval(() => {
                    var tx = sessionStorage.url;
                    this.url = tx;
                    if (tx != 0) {
                        sessionStorage.setItem("url",0)
                        clearInterval(interval);
                        resolve()
                    }
                }, 100)
            });
            await promise;
      }
      ,
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
