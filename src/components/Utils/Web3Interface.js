import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal"; 
import Authereum from "authereum";
import VOTING_ABI from '../../abi/VOTING_ABI.json';

let web3Modal;
let selectedAccount;
let votingContract;
let provider = "https://matic-mumbai.chainstacklabs.com";
let newWeb3;
let contractAddress = '0x3cD887f42c594Adc7De8286AD60A8392817Bc950';

// //Enconder de los argumentos para bytes32[]
// export let staking = Web3.utils.asciiToHex("Staking"); // 0x5374616b696e67 + 0s hasta completar 64
// export let burning = Web3.utils.asciiToHex("Burning"); // 0x4275726e696e67 + 0s hasta completar 64
// //Arg final: ["0x5374616b696e6700000000000000000000000000000000000000000000000000","0x4275726e00000000000000000000000000000000000000000000000000000000"]

export let chainId; 
//Inicializador que usa web3modal + walletconnect
function init() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          80001: "https://matic-mumbai.chainstacklabs.com",
          80001: "https://rpc-mumbai.maticvigil.com",
        },
        // chainId: 80001
      },
    },
    authereum: {
      package: Authereum,
      options: {
        rpc: {
          80001: "https://matic-mumbai.chainstacklabs.com",
          80001: "https://rpc-mumbai.maticvigil.com",

         },
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
  
};

//Se encarga de fetchear: ChainId y Cuentas conectadas
export async function fetchAccountData() {
  newWeb3 = new Web3(provider);
  chainId = await newWeb3.eth.getChainId();
  const accounts = await newWeb3.eth.getAccounts();
  selectedAccount = accounts[0]; //Cuenta conectada

  //Crea la instancia del contrato de Voting
  votingContract = new newWeb3.eth.Contract(
    VOTING_ABI,
    contractAddress
  ); 

};

//Refresca los datos de la cuenta
async function refreshAccountData() {
  await fetchAccountData(provider);
};

//Realiza el proceso de conexion con Metamask,
export async function onConnect() {
  
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not connect to the wallet", e);
    return;
  }

  provider.on("accountsChanged", (selectedAccount) => {
    fetchAccountData();
    console.log("Account changed to", selectedAccount);
  });
  
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
    console.log("ChainId changed to", chainId);
  });

  await refreshAccountData();
};

//Obtiene los votos de cada proposal
export const getProposals= async (arg) => {
	return votingContract.methods
		.proposals(arg)
		.call()
		.then((votes) => {
			return votes;
		});
};

//Funcion de votacion
export const vote = async (arg) => {
    await fetchAccountData();
  
  return votingContract.methods
  .vote(arg)
  .send( { from: selectedAccount,  gas: 300000 } )

};

export const selectedAccountFunction = async () => {
  return selectedAccount;
}

//Inicializador de walletconnect y web3modal
window.addEventListener('load', async () => {
  init();
});