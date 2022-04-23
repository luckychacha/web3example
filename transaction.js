const Web3 = require('web3');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
// local
// const web3 = new Web3(providerRPC.development); //Change to correct network
// test-moonbase
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// local
// const account_from = {
//    privateKey: '5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',
//    address: '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac',
// };
// test-moonbase
const account_from = {
    privateKey: '13fcbfc37327aa75eeb7b8daf03c881908da701ed04fbb1c2b304e43fef67ac7',
    address: '0x12EF8b6672A079C9aEA3e5D8C195b40216DCe4F8',
 };
const addressTo = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac'; // Change addressTo

/*
   -- Create and Deploy Transaction --
*/
const deploy = async () => {
   console.log(
      `Attempting to send transaction from ${account_from.address} to ${addressTo}`
   );

   // Sign Tx with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         gas: 21000,
         to: addressTo,
         value: web3.utils.toWei('0.1', 'ether'),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Transaction successful with hash: ${createReceipt.transactionHash}`
   );
};

deploy();