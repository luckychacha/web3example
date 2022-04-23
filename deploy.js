const Web3 = require('web3');
const contractFile = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// Variables
// const account_from = {
//    privateKey: 'YOUR-PRIVATE-KEY-HERE',
//    address: 'PUBLIC-ADDRESS-OF-PK-HERE',
// };

const account_from = {
    privateKey: '13fcbfc37327aa75eeb7b8daf03c881908da701ed04fbb1c2b304e43fef67ac7',
    address: '0x12EF8b6672A079C9aEA3e5D8C195b40216DCe4F8',
 };

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
   console.log(`Attempting to deploy from account ${account_from.address}`);

   // Create Contract Instance
   const incrementer = new web3.eth.Contract(abi);

   // Create Constructor Tx
   const incrementerTx = incrementer.deploy({
      data: bytecode,
      arguments: [5],
   });

   // Sign Transacation and Send
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         data: incrementerTx.encodeABI(),
         gas: await incrementerTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Contract deployed at address: ${createReceipt.contractAddress}`
   );
};

deploy();