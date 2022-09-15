//import { contractAddress }  from './exports.js';
import { abi }  from './exports.js';
//import worldID from "./node_modules/@worldcoin/id";
const { ethereum } = window;
const STORAGE_STUB = "bare_bones_frontend => "

window.onload = loadData();

const accounts = await ethereum.request({ method: 'eth_accounts' });
if (accounts.length !== 0) {
  const account = accounts[0];
  console.log('Found an authorized account:', account);
} else {
  console.log('No authorized account found');
}

const chainId = await ethereum.request({ method: 'eth_chainId' });
console.log('chainId: ', chainId)

// worldID verify event listener
document.addEventListener("DOMContentLoaded", async function () {
  console.log("loading World ID");
  worldID.init("world-id-container", {
    enable_telemetry: false,
    action_id: "wid_staging_034a32eef8f9c2d4ac2cca30890c2e76", // obtain this from developer.worldcoin.org
    on_success: onWorldIDVerified,
  });
});

function onWorldIDVerified (proof) {
  console.log('world id verified!!')
  console.log(proof);
}

// to set/update the signal param individually if needs
function setSignal() {
  const newSignal = document.getElementById("verificationSignal").value
  worldID.update({
    signal: newSignal,
  });
}

// sc call: isAdmin(<address>)
async function doThing1() {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const contractAddress = document.getElementById("contractAddress").value 

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, abi, signer);

      var inputBox = document.getElementById("input1")
      var outputBox = document.getElementById("output1")
      outputBox.value = ""

      outputBox.value = await connectedContract.isAdmin(inputBox.value);
      console.log("result: ", outputBox.value);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

// call verifyAndExecute on the smart contract
async function doThing2() {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const contractAddress = document.getElementById("contractAddress").value

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, abi, signer);

      var signal = document.getElementById("input2").value
      var root = ethers.BigNumber.from(document.getElementById("input3").value)
      var nullifier = ethers.BigNumber.from(document.getElementById("input4").value)
      var proof = document.getElementById("input5").value
      var outputBox = document.getElementById("output2")

      const unpackedProof = ethers.utils.defaultAbiCoder.decode(["uint256[8]"], proof)[0];
      console.log(unpackedProof)
      console.log("/proof")

      outputBox.value = ""

      try{
        outputBox.value = await connectedContract.verifyAndExecute(signal, root, nullifier, unpackedProof,{ gasLimit: 600000 });
        //outputBox.value = await connectedContract.verifyAndExecute(signal, root, nullifier, unpackedProof);
        console.log("result: ", outputBox.value);
      }
      catch (error) {
        console.log(error)
        outputBox.value = "error"
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

// save text in inputs and textarea
function saveData() {
  const contractAddress = document.getElementById("contractAddress")
  localStorage.setItem(STORAGE_STUB + "contractAddr", JSON.stringify(contractAddress.value))
  console.log("saved contract address: ", contractAddress.value)

  const input1 = document.getElementById("input1")
  localStorage.setItem(STORAGE_STUB + "input1", JSON.stringify(input1.value))
  console.log("saved isAdmin address: ", input1.value)
  
  const scratchpad = document.getElementById("scratchpad")
  localStorage.setItem(STORAGE_STUB + "scratchpad", JSON.stringify(scratchpad.value))
  console.log("saved scratchpad: ", scratchpad.value)
}

// load saved text back into inputs and text area
function loadData() {
  console.log("loadData called")

  const contractAddress = document.getElementById("contractAddress")
  contractAddress.value = JSON.parse(localStorage.getItem(STORAGE_STUB + "contractAddr"))
  console.log("loaded contract address: ", contractAddress.value)

  const input1 = document.getElementById("input1")
  input1.value = JSON.parse(localStorage.getItem(STORAGE_STUB + "input1"))
  console.log("loaded isAdmin address: ", input1.value)
  
  const scratchpad = document.getElementById("scratchpad")
  scratchpad.value = JSON.parse(localStorage.getItem(STORAGE_STUB + "scratchpad"))
  console.log("loaded scratchpad: ", scratchpad.value)


  // worldID verify event listener
   document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOMContentLoaded listener fired")  // debugging: confimation event has fired
    try {
      const result = await worldID.enable();
      console.log("World ID verified successfully:", result);
    } catch (failure) {
      console.warn("World ID verification failed:", failure);
      // Re-activate here so your end user can try again
      worldID.enable()
    }
  });

  // event listeners
  var signal_Btn = document.getElementById("signal_Btn");
  signal_Btn.addEventListener("click", function() {
    console.log("signal_Btn")
    setSignal()

  }, false);

  var save_Btn = document.getElementById("save_Btn");
  save_Btn.addEventListener("click", function() {
    console.log("save_Btn")
    saveData()

  }, false);

  var doThing1_Btn = document.getElementById("doThing1_Btn");
  doThing1_Btn.addEventListener("click", function() {
    console.log("doThing1")
    doThing1()
  }, false);

  var doThing2_Btn = document.getElementById("doThing2_Btn");
  doThing2_Btn.addEventListener("click", function() {
    console.log("doThing2")
    doThing2()
  }, false);
 
}

