<template>
  <div>
    <div id="postAd" uk-modal="" class="uk-modal" style="" tabindex="0">
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Post a Public Ad for your Nft</h2>
        <form>
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <input
                v-model="name"
                class="uk-input"
                type="text"
                placeholder="Name of NFT"
              />
            </div>
            <div class="uk-margin">
              <input
                v-model="price"
                class="uk-input"
                type="text"
                placeholder="Price: Ex 3 BTC"
              />
            </div>
            <div class="uk-margin">
              <a
                v-on:click="postAd(name, price)"
                class="uk-button uk-button-primary"
                >Post Your Ad
                <div :class="hide" uk-spinner></div>
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <div id="payment" uk-modal="" class="uk-modal" style="" tabindex="0">
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Add Payment txId</h2>
        <form>
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <input
                v-model="txId"
                class="uk-input"
                type="text"
                placeholder="Price: Ex 3 BTC"
              />
            </div>
            <div class="uk-margin">
              <a v-on:click="pay(txId)" class="uk-button uk-button-primary"
                >Pay
                <div :class="hide" uk-spinner></div>
              </a>
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
              <input
                v-model="name"
                class="uk-input"
                type="text"
                placeholder="Name of NFT"
              />
            </div>
            <div class="uk-margin">
              <input
                v-model="price"
                class="uk-input"
                type="text"
                placeholder="Amount"
              />
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
              <a
                v-on:click="bid(price, currency)"
                class="uk-button uk-button-primary"
                >Bid
                <div :class="hide" uk-spinner></div>
              </a>
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
              <input
                v-model="name"
                class="uk-input"
                type="text"
                placeholder="Name of NFT"
              />
            </div>
            <div class="uk-margin">
              <input
                v-model="price"
                class="uk-input"
                type="text"
                placeholder="Amount"
              />
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
              <input
                v-model="newOwner"
                class="uk-input"
                type="text"
                placeholder="New Address"
              />
            </div>
            <div class="uk-margin">
              Their wallet
              <input
                v-model="fromAddress"
                class="uk-input"
                type="text"
                placeholder="The wallet they are paying with"
              />
            </div>
            <div class="uk-margin">
              Your wallet
              <input
                v-model="toAddress"
                class="uk-input"
                type="text"
                placeholder="The wallet you would like the payment to go to"
              />
            </div>
            <div class="uk-margin">
              <a
                v-on:click="transfer(name, newOwner, price, currency, price)"
                class="uk-button uk-button-primary"
                >Transfer your NFT
                <div :class="hide" uk-spinner></div>
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <bridge-nav />
    <br /><br /><br /><br /><br /><br /><br />
    <div id="home">
      <h2 id="title">Owners of: {{ name }}</h2>
      <a :href="url">
        <img :src="url" />
      </a>
      <hr />
      Minted By {{ orig }}
      <div v-for="transfer in transfers" :key="transfer">
        <hr />
        {{ transfer }}
      </div>
      <h3>Bids</h3>
      <div style="margin-top: 10px" v-for="bid in bids" :key="bid">
        <a
          v-on:click="inputBid(bid)"
          style="margin-top:100px; background-color: rgb(13, 12, 34,0.3); !important"
          class="btn-main"
          uk-toggle="target: #transfer"
          aria-expanded="false"
        >
          {{ bid[1] }} &nbsp; {{ bid[2] }} &nbsp; {{ bid[3] }}
        </a>
      </div>
      <hr />
      <a class="btn-main" uk-toggle="target: #bid" aria-expanded="false">
        Bid
      </a>
      &nbsp;
      <a
        :class="mine"
        class="btn-main"
        uk-toggle="target: #postAd"
        aria-expanded="false"
      >
        Post Ad
      </a>
      <hr />
      <a class="btn-main" uk-toggle="target: #payment" aria-expanded="false">
        Input Payment Receipt
      </a>
      &nbsp;
      <a
        v-on:click="confirm()"
        style="margin-top:100px; background-color: rgb(13, 12, 34,0.3); !important"
        class="btn-main"
        :class="mine"
        aria-expanded="false"
      >
        Confirm
      </a>
      <hr />
      <a
        :class="mine"
        style="background-color: rgb(13, 12, 34,0.3); !important"
        class="btn-main"
        uk-toggle="target: #transfer"
        aria-expanded="false"
      >
        Transfer your NFT
      </a>
      <hr />
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

#home > center > h1 {
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
import { hexToBytes, bytesToHex } from "@/lib/hex";
import * as Ar from "@/lib/adamant-api.js";
import { EPOCH } from "@/lib/constants.js";
import BridgeNav from "@/components/BridgeNav.vue";
import Arweave from "arweave";
// Or manually specify a host
const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});

async function checkAdamant(amount, time, owner, newOwner, txId) {
  var f = "" + txId + "";
  var tx = await Ar.getTransaction(f);
  console.log(tx);
  var am = amount * 100000000;
  if (
    tx.block_timestamp > time ||
    tx.amount < am ||
    tx.senderId != newOwner ||
    tx.recipientId != owner
  ) {
    return false;
  } else {
    return true;
  }
}
sessionStorage.setItem("x", 0);

export default {
  components: { BridgeNav },
  data: () => ({
    hide: "hide",
    mine: "hide",
    name: "",
    url: "",
    orig: "",
    txId: "",
    transfers: [],
    bids: [],
    price: 0,
    currency: "Adm",
    currentOwner: "",
    newOwner: "",
    fromAddress: "",
    toAddress: "",
  }),
  async mounted() {
    this.hide = "";
    var blockheight = await arweave.transactions.get(
      "hKMMPNh_emBf8v_at1tFzNYACisyMQNcKzeeE1QE9p8"
    );
    var f = await arweave.transactions.getStatus(
      "bNbA3TEQVL60xlgCcqdz4ZPHFZ711cZ3hmkpGttDt_U"
    );
    console.log(blockheight, f);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const nft = urlParams.get("name");
    this.name = nft;
    const ownerCheck = urlParams.get("owner");
    const orig = urlParams.get("orig");

    if (orig) {
      var x = Ar.getStored(nft, orig, 2, "asc");
      var y = Ar.getStored(nft + "|", orig, 10, "asc");
    } else {
      var x = Ar.getStoredArray(nft, 2, "asc");
    }
    var minted = await x;
    console.log(x);

    this.orig = minted[0].senderId;

    var y = Ar.getStored(nft + "|", this.orig, 10, "asc");

    this.url = minted[0].asset.state.value;

    var transfers = await y;
    var currentOwner = minted[0].senderId;

    while (transfers.length > 0) {
      var transfer = transfers[0].asset.state.value.split("|");
      if (transfer.length < 2) {
        //If the transfer is a gift
        this.transfers.push("Transfered to " + transfers[0].asset.state.value);
        transfers = await Ar.getStored(
          nft + "|",
          transfers[0].asset.state.value,
          10,
          "asc",
          0,
          transfers[0].height + 1
        );
        currentOwner = transfers[0].asset.state.value;
      } else {
        if (transfer.length > 1) {
          var txid = await Ar.getStored(
            nft + "|payment",
            transfer[0],
            1,
            "asc",
            2,
            transfers[0].height + 1
          );
          var from = transfers[0].senderId;
          var paymentTo = transfer[4];
          var paymentFrom = transfer[3];
          var currency = transfer[1];
          var amount = transfer[2];
          var time = transfers[0].block_timestamp + 3600;
          if (Date.now() / 1000 < transfers[0].block_timestamp + 3600 + EPOCH) {
            var confirmation = await Ar.getStored(
              nft + "|confirm",
              transfers[0].senderId,
              10,
              "asc",
              0,
              transfers[0].height + 1
            );
            if (confirmation.length > 0) {
              this.transfers.push(
                "Transfered to " +
                  transfer[0] +
                  " For " +
                  amount +
                  " " +
                  currency
              );
              transfers = await Ar.getStored(
                nft + "|",
                transfer[0],
                10,
                "asc",
                0,
                transfers[0].height + 1
              );
              currentOwner = transfer[0];
            } else {
              this.transfers.push(
                "This NFT is currently being transferred sorry. If you are yet to pay submit a payment reciept. If you are the owner speed up the process by confirming."
              );
              break;
            }
          } else {
            if (txid.length > 0) {
              if (txid[0].block_timestamp > time) {
                transfers = await Ar.getStored(
                  nft + "|",
                  transfers[0].senderId,
                  10,
                  "asc",
                  0,
                  transfers[0].height + 1
                );
              } else {
                var t = false;
                if (currency.toLowerCase() === "eth") {
                  t = await this.checkEth(
                    "eth",
                    amount,
                    time + EPOCH - 3600,
                    paymentTo,
                    paymentFrom,
                    txid[0].state.value
                  );
                } else if (
                  currency.toLowerCase() === "btc" ||
                  currency.toLowerCase() === "dash" ||
                  currency.toLowerCase() === "doge"
                ) {
                  t = await this.checkBitcoin(
                    currency.toLowerCase(),
                    amount,
                    time + EPOCH - 3600,
                    paymentTo,
                    paymentFrom,
                    txid[0].state.value
                  );
                } else if (currency.toLowerCase() == "adm") {
                  t = await checkAdamant(
                    amount,
                    time,
                    from,
                    transfer[0],
                    txid[0].state.value
                  );
                }
                if (t) {
                  this.transfers.push(
                    "Transfered to " +
                      transfers[0].asset.state.value +
                      " For " +
                      amount +
                      " " +
                      currency
                  );
                  transfers = await Ar.getStored(
                    nft + "|",
                    transfers[0].asset.state.value.split("|")[0],
                    10,
                    "asc",
                    0,
                    transfers[0].height + 1
                  );
                  currentOwner = transfers[0].asset.state.value.split("|")[0];
                }
              }
            } else {
              transfers = await Ar.getStored(
                nft + "|",
                transfers[0].senderId,
                10,
                "asc",
                0,
                transfers[0].height + 1
              );
            }
          }
        }
      }
    }
    this.hide = "hide";
    if (ownerCheck === currentOwner) {
      this.transfers.push("Verification complete this is the correct owner");
    } else {
      this.transfers.push(
        "They tried to scam you but alas you beat their wits"
      );
    }
    if (currentOwner === JSON.parse(sessionStorage.adm).address) {
      this.mine = "";
    }
    this.currentOwner = currentOwner;
    var data = await Ar.getChatsB(currentOwner);
    var enc = new TextDecoder();
    var v = [];
    for (var i in data) {
      v[i] = await enc
        .decode(hexToBytes(data[i].asset.chat.message))
        .split("|");
    }
    for (var i = 0; i < v.length; i++) {
      if (v[i][0] === this.name + "@") {
        this.bids.push(v[i]);
      }
    }
    console.log(data);
  },
  methods: {
    postAd: async function (name, price) {
      this.hide = "";
      var nft = await Ar.getStoredArray(name, 2, "asc");
      name =
        name +
        "|" +
        price +
        "|" +
        nft[0].senderId +
        "|" +
        nft[0].asset.state.value;
      console.log(name);
      await Ar.sendMessageB({ to: "U18074128740382246868", message: name });
      this.hide = "hide";
      alert("NFT ad made!");
    },
    confirm: async function () {
      if (confirm("Are you sure they paid?") == true) {
        await Ar.storeValue(this.name + "|confirm", "confirmed");
      } else {
        alert("Confirm cancelled");
      }
      await Ar.storeValue(this.name + "|confirm", "confirmed");
      alert("Cofirmed!");
    },
    pay: async function (txId) {
      await Ar.storeValue(this.name + "|payment", txId);
      alert("Payment pushed");
    },
    transfer: async function (
      name,
      newOwner,
      type = 0,
      currency = "ADM",
      amount = 0
    ) {
      this.hide = "";
      //name|newOwner|currency|time
      if (type == 0) {
        await Ar.storeValue(name + "|", newOwner);
      } else {
        if (currency === "Arweave") {
          var blockheight = await arweave.blocks.getCurrent();
          console.log(blockheight);
          await Ar.storeValue(
            name + "|",
            newOwner +
              "|" +
              currency +
              "|" +
              amount +
              "|" +
              this.fromAddress +
              "|" +
              this.toAddress +
              "|" +
              blockheight
          );
        } else {
          await Ar.storeValue(
            name + "|",
            newOwner +
              "|" +
              currency +
              "|" +
              amount +
              "|" +
              this.fromAddress +
              "|" +
              this.toAddress
          );
        }
      }
      alert("Transfer pushed");
      this.hide = "hide";
    },
    bid: async function (amount, currency) {
      console.log("bid");
      var h = await Ar.sendMessageB({
        to: this.currentOwner,
        message:
          this.name +
          "@|" +
          currency +
          "|" +
          amount +
          "|" +
          JSON.parse(sessionStorage.adm).address,
      });
      console.log(h);
      console.log(this.currentOwner);
      alert("Pushed bid");
    },
    inputBid: async function (bid) {
      this.price = bid[2];
      this.newOwner = bid[3];
      this.currency = bid[1];
      try {
        if (this.length > 0) {
          this.fromAddress = bid[4];
        } else {
          this.fromAddress = await Ar.getStored(
            bid[1].toLowerCase() + ":address",
            bid[3],
            1,
            "desc"
          );
        }
      } catch {
        this.fromAddress = await Ar.getStored(
          bid[1].toLowerCase() + ":address",
          bid[3],
          1,
          "desc"
        );
      }
      this.toAddress = await Ar.getStored(
        bid[1].toLowerCase() + ":address",
        JSON.parse(sessionStorage.adm).address,
        1,
        "desc"
      );
    },
    checkEth: async function (currency, amount, time, owner, newOwner, txId) {
      await this.$store.dispatch("eth" + "/updateTransaction", {
        hash: txId,
        force: true,
        updateOnly: true,
      });
      let promise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          var tx = sessionStorage.x;
          console.log(tx);
          if (tx > 0) {
            sessionStorage.setItem("x", 0);
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
      await promise;
      var tx = sessionStorage.transaction;
      tx = JSON.parse(tx);
      console.log(tx);
      if (
        tx.timestamp > time ||
        tx.amount < amount ||
        tx.senderId != newOwner ||
        tx.recipientId != owner
      ) {
        return false;
      } else {
        return true;
      }
    },
    checkBitcoin: async function (
      currency,
      amount,
      time,
      owner,
      newOwner,
      txId
    ) {
      await this.$store.dispatch(
        currency.toLowerCase() + "/updateTransaction",
        { hash: txId, force: true, updateOnly: true }
      );
      let promise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          var tx = sessionStorage.x;
          console.log(tx);
          if (tx > 0) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
      await promise;
      var tx = sessionStorage.transaction;
      console.log(tx);
      tx = JSON.parse(tx);
      if (currency === "btc") {
        var t = 0;
        if (tx.timestamp > time) {
          return false;
        } else {
          for (var i in tx.vin) {
            if (tx.vin[i].prevout.scriptpubkey_address === newOwner) {
              t++;
              if (amount > tx.vin[i].prevout.value / 100000000) {
                return false;
              }
            }
          }
          for (var i in tx.vout) {
            if (tx.vout[i].scriptpubkey_address === owner) {
              t++;
              if (amount > tx.vout[i].amount / 100000000) {
                return false;
              }
            }
          }
          if (t > 1) {
            return true;
          } else {
            return false;
          }
        }
      } else if (currency === "dash") {
        var t = 0;
        if (tx.blocktime > time) {
          return false;
        } else {
          for (var i in tx.vin) {
            if (tx.vin[i].addr === newOwner) {
              t++;
              if (amount > tx.vin[i].value) {
                return false;
              }
            }
          }
          for (var i in tx.vout) {
            if (tx.vout[i].scriptPubKey.addresses[0] === owner) {
              t++;
              if (amount > tx.vout[i].value) {
                return false;
              }
            }
          }
          if (t > 1) {
            return true;
          } else {
            return false;
          }
        }
      } else if (currency === "doge") {
        if (tx.time > time) {
          return false;
        } else {
          for (var i in tx.vin) {
            if (tx.vin[i].addr === newOwner) {
              t++;
              if (amount > tx.vin[i].value) {
                return false;
              }
            }
          }
          for (var i in tx.vout) {
            if (tx.vout[i].scriptPubKey.addresses[0] === owner) {
              t++;
              if (amount > tx.vout[i].value) {
                return false;
              }
            }
          }
          if (t > 1) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
  },
};

/*
Buy now links to ?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
*/
</script>
