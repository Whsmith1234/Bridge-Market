<template>
<div>
  <div id="arweave" uk-modal="" class="uk-modal" style="" tabindex="0">
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Your Arweave</h2>
          <br> Address: {{arweaveAddress}}
          <hr>
          Amount: {{arweaveAmount}}
          <br>
          Transactions from this wallet
          <div v-for="transaction in transactions" :key="transaction">
        <hr />
       <a :href="'https://viewblock.io/arweave/tx/'+ transaction.node.id"> {{ transaction.node.id }}</a>
      </div>
        <hr>
          <form>
            <a href = "#" v-on:click="connectAr()">Update Arweave</a>
          </form>
        </div>
    </div>
  <v-layout row wrap justify-center :class="className">
    <container>
      <v-card
        flat
        class="transparent white--text"
        :class="`${className}__card`"
      >
        <!-- Wallets -->
        <v-card :class="`${className}__wallets`" flat>
          <v-tabs ref="vtabs" grow show-arrows>
            <a  uk-toggle="target: #arweave">
            <v-tab>
              <div>
                <img
                  width="50 px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAA81BMVEX///9oqMQsbIh8vNg8e41UlLD///38//94p7xjkqB/v9tlpcEhYX2Hx+MkZIBwsMxop8dgoLxMjKgvb4tjo781dZFZmbU8eo5yss54uNRGhqI5eZX///pBgZ1oqMIqa4vt9PWixtZ9sMS20to8fIk/fZRUkqaIt89spbTC3uOJuMbW5+5spsWpzdZ5rsPo8/OlwsxllaiXx9hci6FEg5VioLZ7uctjobdMi559utqXvc99q8jY6+1in8JgqsZwr8OEp7GStrwub36zyc1fiZxslp3K2t1GdYOCqLBLh5J/nK+HrL00cXshXn+20tUmbpBVfo3zCR4FAAAMaElEQVR4nO2cCXfaOBeGZUPlBKfYBIKzOMIJW1Pc0OmED9qhzU7SdfL/f81IBowXSd6XfIc37Tk9CTR+uIuurhYAttpqq6222mqr/yPBHCTloDxAcvmwgJS90XP4Ffh3fPxrN2P99envncz1AYzbg6pWzU7a4OjtXnP/TaaatMdAOhOm/ew4+kqt8nZPFE8zxGgj4Qw719hUlcFVNhhXk7eVigUiisdZYbQUWTBI1uoKqipkgjI5qlVsEPHguJ0BRgM/vfwBZy0AjXNVNVU0SDlS7gZHnysVBwhG2U8bpSELpqqeG4RDIiZBgmm+u0oRRZv9r7KWDSKKJ6litAUspApdPOZaSXhHMMl3ULta7fVSoOhV+6hWoYGkGioy4cCPvmOPJvOWan1PQLNUQuVqcOTgcIPUD9JJxTg4llJbc7jigOCMgKj4S2nMknMM0NvK58+f6SDEv1IIFRwc8grkDNggurGDLBKiJCgkyGao4pEXRGwmDZX2CoI40c5YX4MAHVw0BGT/aKLFjnpNe1fzcvhBxKaYKBVvMASzcQF127MkaLxXN4xI2Y9Jog38GDQQwhI7VBobDJyy3huOohT/62LzMzI+TmMF/ey65ggNPgiuWmKhtAWnTHThqa6lIXK9QmjPIlpFm00rNHswQcTm6ZuoDuYIjqWGErRjfeleIzeIikMlUi3ZR0c1ijV4IHioj1ZL+jAENHJhWPri4sDuJZiDXmiOwefKEc2t+CCkagnP0fBiCMIXHN++SVZL9b5MkbVqiAyGX3RId6pgkPAFfttHgeQWdbbYnfpfqrwJEfXLYj0uSLiqpd3yPZwpoC592nvuMwl5cVCBfzVhBkdIkOACv03xKuz/Q79bWcPiyBdLllqDKqkDKSLfnBxyIUKBiE1+ge+3hjVKyCOdSiJJn2jvUGXEHlWuriusEI8Cgod6dtXiD47VB/yJ0Z6R9PklDYQksDY1FfcnvBiPAsIJlZbCALlkGARPsZZVMJVE8I+PV4MKHsiDDRIWhFrgN1gYpOoFkE4CgGEKNBQiZTLDmdim0XCxHowQCUQkBb4Hgx611qdrGgwIS13/YGILNY43HMcKox5JBIILfEfQs4LDAmnQU6/lWjhxwX8Q4504S5jyZA2CKmHNEQ0Ey07FTGtYj/OPvzZxwYwbAtO7iGYk585CGyMGyKrAp44ca3Pg6d+cy4ED/kzlccjX06vZNX8gTwpCCnyeVxES9YxSYzklwfElnlnxPgxUi2aPGCCieMjlQOrlGPJ7/PinXZUHgo0SlSMGSJ2ZdFcgdieLFyWXPN8qA4iqno/5jmWBYJOUHERQu/yUtSKRzssOci4xh3QXyLylmuwwKRgEmY7WIh+ENB7V8oKopLUYxiD4NcaUEyZFu5Y6NWgTdaqki69mWUHMrxfhIIh0Y8gudAoGkYdGSHMQ93I0HssGIlyESb02CRx+YzlXkSA4mw6jcGCNBFbiKhIEqcIIRCT58q2MIN++ABgNBErvGCm4UNd6Fzbx2pLI2k/pQBoXkXfoSEB6T0/BBYLIrlWdkIJwRGvXFQrSGoWpTTwc2CjULldhIKogs1qLQRpd00gKs4h6PYrHAcAZLQMXBoLO4nJA4xpP370wxYBg30ARiiwPCLigJK6CQFT1T8Qh3QkCdvxdroJAvp2D0NMQLwfOEXP/FKsgkOk8NogF40/BhYDg+W18CCJ97Fv7KQbkcsxY1QkpCX7wxnshIPKHwM5iAIg+HgpmwSDIFIZjXUpGAkEXuadY0UEO2yfJLKJed5NuTCdF2nt3vEcFsRrrb07qSUDeg6jzQr9BcAr+Gt8itaPVu1pv4oOgr/PEIBaMOwVHAnG+8TS8UdwgcsLUu5YutWKCeJZrGgfxQExJD37KYEEJXrRQDJAjwStlPySKEwS1LmCCId0lYxgd5EihFJxKa78ZGWRopEOBBReCHBGE2SpsHIcIFQeIqS5SMgcBkYabhcUQIDXeWqbcCvYvp0UYe5liai7Y9XwwiD84PA4WmIptENVqLaapLzIyw4FQg8NrlVO+VVYgpirIX1IYQByCZNO5GgxS86ZcllHap2EsoqKdGJ0svi4aagiLKPxVTKfaHKOsQBBpLaYte9M5ByQoODxih8oKRCUbxtOW3Xhkg4QIDo9Y/rUGaY1SDRBLknQmIx5IuOBwS2EU+CsQ+SzhJISuEbJWseggcTAsUQt8C8T8hlJOvUtBcGblLQpILWJwuNR4469aLBBVOEs39a44JCDtqCYVJAEGkewLFQJiqu+kJA0gnrqIBnIYOca9UhpNCsg1e9diQkFwLvtAjoTEHFiH7gKfgKjnWTjWimQ+9YCEqUdCSZGPm26QaQap15b0oeEAqbGL9ThyFPgYpPEhO4MQk1xuQLjFehzhAr9ug1zOs72YoCsvQWpR65FwWk0g60rL2iSXlU0gBOPzJchRql5lS2lZBX5dOR+H2pQVHwV01RoeAA9TyVVUFFLg15XMUq9NAs9rqQeHR+2DvSFMpQPE4ZDAOGMMLOV0nNWY7tRNm7vBOZnIf21ObjOHIDLqx7wd+IlRpoOekQsI+Lh3sC9nk7UEcsru7j4fDmj8XRdP9lMnIUegUPuqqj0a+XBgkzQ7HfEk5QRM5jqoTw6l5WUQ/PWAQcT6fqqDiYqurRtNeo/5cFggC2ISUWzyjw9F45AnVY0cF3pa5JF613q0QMg9J6mECp55tq9Wx5ufc4MAJN7r/y7r1OZJOwUUpTFbnaHtP+VoDqKuveTcPE0OMquuTzje/cmXAxoPYsdG8Z/8DyuScc2JfaJZ03ZDnNVJk0OHi7oNItZP2Uc4gyRPN8c0Mcgi2U6NyCAQSj82IFhxq5aG8xIpTXvOOULIb1u4u+nN42hBj6yjgJ5r474vcsVYsfzwttUipmKktL0nsm/y58DeJd15SU7oO4UZHFPffV69UIfA0tdHf/t5P3SoWBcwuBxLI1VvESAQvPhA6gf7zBsBVlKtKtd/uwdOvQVALDWibcQKU7VQb/a4mxcGAn/+ppCIJ/zYQKivUW71uLuNva83sfTRgdihkOACn+lXOOXeUcxR1b4XZxBcbv+kWcRKxYyhHk1oFES3uVzeShfUx30WCT1UJsx74XaDTqhnCoJTcKfD2O/TPHFfBYKQwrwoptfv3ReSeR3qU6NkiXLqBtlnWQMPJ9+LpSALDXtMEFeBL08491v1f4U7EJ0ZhVVy8fZf4QJ/aY7GjHdR191zgZG+km48cUBEUuArJvfuRw2n3uKGkA0IvP/NcS7iX8eDPu/atF4VF1lFG4RcDj5+4IOInSr/suqDR5J6i7cJuA8AEXkUxLdyai0GCUpBJuFj9Hdznt+yBMEikUW0RRnciginYL5J2Azk7w0osDhxCc966x0eCs8c1adipoU0QQjveeM7F+TuDyxmok4T9owH3vjOA9kFUkEtB7q48c4L9RQ3jKcinVdycTieQb490iDpYMGcYvFAvpfNIFg/mszMxcI46D2XJ2XZMpr/RrQInk4ZRT81TR+Zxw1ZIHktqEcTBC8RXUvLa/02miQwZ5mEAXI3LnwaQpMEjBtGCmaA3Bp6GUHIBSSMkxR0jqt5iYoTj37Se0NUjn4+e5niyfAvNLBA+rslaDiw9ZHadqRapJSpdy0InjoU7/JBaNXeS/mGdIcksKBNsfwgmjYvbaAT4Wx6Uw8DcndbaoMQGU9hQF6Mop8zULDrX47zZSyxW3Z7LLfbBIFo5U69S0ngPti1iu/1BgtC6cGbgb2597FU7QaG8BOO6k2uRZ7m2Z5ESEe6pIMbz1jiGUNIw6H8IJZ+sy2i9X8V/XShJen3e2yL/PrzCiIdLNcVIXQ3Hl0Wecz6aEh6ggAuRGfmco6FvUV5p1MUSTsdOkj1+VX41UaLE5praVoRuxZjy/KcG3qM3JS+6vXK0DpekB7+YxT9XFEFwf1e0w2iadVythb50sGm5FpHSG+3NMuFUTS2TbIOEHFc9DPFkmQ3HtcWuX1NI8hG+lxzx8hLvicRUhMEt2LTaZGPRT9RTEForLbXLadTD8ZrjHRiEH3deFymrFeYelfCn//LGgTPb8k3XmeQkAuH6muQXpZ3UWQuCH7uLUFeQWuRJ0k3NGsHXfXK0F81CZTIrLffv4t/oXVZZOyKHU3bNYp+jmQi48Z9UyS7FuHraDmwBeFDp//42v0KWGs/YjWTC7/yFgSPz68+0okkYBipXQ+71VZbbbXVVltttdVWCfQfjNeCUpbkyTQAAAAASUVORK5CYII="
                />
                <div>{{arweaveAmount}}</div>
                <div>Ar</div>
                  
              </div>
            </v-tab>
            </a>
            <v-tab
              v-for="wallet in wallets"
              :key="wallet.cryptoCurrency"
              :href="`#${wallet.cryptoCurrency}`"
              @wheel="onWheel"
            >
              <div>
                <crypto-icon
                  slot="icon"
                  :crypto="wallet.cryptoCurrency"
                  size="medium"
                  :class="`${className}__icon`"
                />
                <div>{{ wallet.balance | numberFormat(4) }}</div>
                <div>
                  {{ wallet.cryptoCurrency }}
                  <span v-if="wallet.erc20" style="font-size: 10px">
                    <sub>ERC20</sub>
                  </span>
                </div>
              </div>
            </v-tab>

            <v-tab-item
              v-for="wallet in wallets"
              :key="wallet.cryptoCurrency"
              :value="wallet.cryptoCurrency"
            >
              <wallet-card
                :address="wallet.address"
                :balance="wallet.balance"
                :crypto="wallet.cryptoCurrency"
                :crypto-name="wallet.cryptoName"
                @click:balance="goToTransactions"
              >
                <crypto-icon
                  slot="icon"
                  :crypto="wallet.cryptoCurrency"
                  size="large"
                />
              </wallet-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-card>
    </container>
  </v-layout>
</div>
</template>

<script>
import WalletCard from "@/components/WalletCard";
import CryptoIcon from "@/components/icons/CryptoIcon";
import Arweave from 'arweave';
// Or manually specify a host
const arweave = Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
});




import { Cryptos, CryptosNames, isErc20 } from "@/lib/constants";

/**
 * Center VTab element on click.
 *
 * @override vuetify.VTabs.methods.scrollIntoView()
 */
function scrollIntoView() {
  if (!this.activeTab) return;
  if (!this.isOverflowing) return (this.scrollOffset = 0);

  const totalWidth = this.widths.wrapper + this.scrollOffset;
  const { clientWidth, offsetLeft } = this.activeTab.$el;

  const scrollOffset =
    this.scrollOffset -
    (totalWidth - offsetLeft - clientWidth / 2 - this.widths.wrapper / 2);

  if (scrollOffset <= 0) {
    this.scrollOffset = 0;
  } else if (scrollOffset >= this.widths.container - this.widths.wrapper) {
    this.scrollOffset = this.widths.container - this.widths.wrapper;
  } else {
    this.scrollOffset = scrollOffset;
  }
}
export default {
  components: {
    WalletCard,
    CryptoIcon,
  },
  data: () => ({
    arweaveAddress: "",
    arweaveAmount: 0,
    transactions: []
  }),
  computed: {
    className: () => "account-view",
    wallets() {
      return Object.keys(Cryptos).map((crypto) => {
        const state = this.$store.state;
        const key = crypto.toLowerCase();
        const address =
          crypto === Cryptos.ADM ? state.address : state[key].address;
        const balance =
          crypto === Cryptos.ADM ? state.balance : state[key].balance;
        const erc20 = isErc20(crypto.toUpperCase());

        return {
          address,
          balance,
          cryptoCurrency: crypto,
          cryptoName: CryptosNames[crypto],
          erc20,
        };
      });
    },
    currentWallet: {
      get() {
        return this.$store.state.options.currentWallet;
      },
      set(value) {
        this.$store.commit("options/updateOption", {
          key: "currentWallet",
          value,
        });
      },
    },
  },
  mounted: async function() {
    this.connectAr();
    this.$refs.vtabs.scrollIntoView = scrollIntoView;
  },
  methods: {
     connectAr: async function(){
     var wt = await window.arweaveWallet.connect(["ACCESS_ADDRESS", "ACCESS_ALL_ADDRESSES", "SIGN_TRANSACTION", "ENCRYPT", "DECRYPT"], { name: "Bridge-Market", logo: "https://verto.exchange/logo_dark.svg" });
     wt = await window.arweaveWallet.getActiveAddress();
     var balance = await arweave.wallets.getBalance(wt)
     let ar = arweave.ar.winstonToAr(balance)
     ar = Number(ar)
     console.log(ar);
     this.arweaveAmount=ar.toFixed(5);
     this.arweaveAddress=wt;
     var transactions = await fetch('https://arweave.net/graphql', {
        method: 'POST',
        body: JSON.stringify({
          query: `{
            transactions(owners:["${wt}"]) {
                edges {
                    node {
                        id
                    }
                }
            }
          }`
        }),
        headers: {
            'content-type': 'application/json'
        }
      });
      var transactions = await (transactions.json());
      console.log(transactions)
      this.transactions = transactions.data.transactions.edges;
    },
    goToTransactions(crypto) {
      this.$router.push({
        name: "Transactions",
        params: {
          crypto,
        },
      });
    },
    onWheel(e) {
      const currentWallet = this.wallets.find(
        (wallet) => wallet.cryptoCurrency === this.currentWallet
      );
      const currentWalletIndex = this.wallets.indexOf(currentWallet);

      const nextWalletIndex =
        e.deltaY < 0 ? currentWalletIndex + 1 : currentWalletIndex - 1;
      const nextWallet = this.wallets[nextWalletIndex];

      if (nextWallet) this.currentWallet = nextWallet.cryptoCurrency;
    },
  },
};

</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_variables.styl';
@import '~vuetify/src/stylus/settings/_colors.styl';
@import '../assets/stylus/settings/_colors.styl';

/**
 * 1. Reset VTabs container fixed height.
 * 2. Reset VTabItem opacity.
 */
.account-view {
  &__wallets {
    &.v-card {
      background-color: transparent;
    }

    >>> .v-tabs__container {
      height: auto; // [1]
    }

    >>> .v-tabs__slider {
      height: 2px;
    }

    >>> .v-tabs__wrapper {
      padding: 10px 0px 1px 0px;
      margin-bottom: 10px;
    }

    >>> .v-tabs__item {
      font-weight: 300;
      padding: 6px 4px;
    }

    >>> .v-tabs__item--active {
      font-weight: 500;
    }

    >>> .v-tabs__item:not(.v-tabs__item--active) { // [2]
      opacity: 1;
    }

    >>> .v-tabs__div {
      font-size: 16px;
      min-width: 74px;
    }
  }

  &__icon {
    margin-bottom: 3px;
  }
}

/* * Themes * */
.theme--light {
  .account-view {
    &__wallets {
      >>> .v-tabs__bar {
        background-color: $adm-colors.secondary2-transparent;
      }

      >>> .v-tabs__slider {
        background-color: $adm-colors.primary !important;
      }

      >>> .v-tabs__item {
        color: $adm-colors.regular;
      }

      >>> .v-tabs__icon {
        color: $adm-colors.primary2;
        pointer-events: none;
      }

      >>> .v-tabs__wrapper--show-arrows {
        margin-left: 0;
        margin-right: 0;
      }

      >>> .v-tabs__item--active {
        color: $adm-colors.primary;

        .svg-icon {
          fill: $adm-colors.primary;
        }
      }
    }
  }
}

.theme--dark {
  .account-view {
    &__wallets {
      >>> .v-tabs__bar {
        background-color: transparent;
      }

      >>> .v-tabs__slider {
        background-color: $adm-colors.primary !important;
      }

      >>> .v-tabs__icon {
        color: $adm-colors.primary2;
        pointer-events: none;
      }

      >>> .v-tabs__wrapper--show-arrows {
        margin-left: 0;
        margin-right: 0;
      }

      >>> .v-tabs__item {
        color: $shades.white;
      }

      >>> .v-tabs__item--active {
        color: $adm-colors.primary;

        .svg-icon {
          fill: $adm-colors.primary;
        }
      }
    }
  }
}
</style>
