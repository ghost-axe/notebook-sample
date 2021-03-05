import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3'
import { Toast } from 'vant'
import 'vant/lib/toast/style'

Vue.use(Toast)

let web3Provider
if (window.ethereum) {
  web3Provider = window.ethereum
  try {
    window.ethereum.enable()
  } catch (error) {
    console.error("User denied account access")
  }
} else if (window.web3) {
  web3Provider = window.web3.currentProvider
} else {
  web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
}
Vue.prototype.$web3 = new Web3(web3Provider)
Vue.prototype.$notebookAddr = '0xb031215612d12dd26c7E183B125d1788BE43F73C'
Vue.prototype.$myAddr = '0x594D8DE6F6522d05a98eff2fB8fC17fEA2EB2E9C'
Vue.prototype.$notebookAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "addNote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNoteIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "notes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isDel",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
Vue.prototype.$notebookContract = new Vue.prototype.$web3.eth.Contract(
    Vue.prototype.$notebookAbi,
    Vue.prototype.$notebookAddr,
    {
      from: Vue.prototype.$myAddr
    }
    )

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
