# guessing-game-aiken-smart-contract

## 1. Compile contract

```sh
cd guessing-game-aiken-smart-contract
aiken build -t verbose
```

## 2. Run scripts to test step-by-step

### Install dependencies

```sh
cd guessing-game-aiken-smart-contract/scripts
npm install
```

### Setup environment variables

Create your own .env file and fill out all the variables

```sh
cp .env.example .env
```

BLOCKFROST_API_KEY: Please go to website https://blockfrost.io/ and create your own API key

BLOCKFROST_URL: Blockfrost URL (e.g: https://cardano-preprod.blockfrost.io/api/v0)

NETWORK: Cardano network (e.g: Preprod)

### 2.1. Lock the fund

Check file `lock.js`, change your input here:

```js
// Alice address
const mnemonic = "<ALICE_MNEMONIC";

// Amount to lock
const amount = 5_000_000n;

...

const secretNumber = "42";
```

Run script:

```sh
node lock.js
```

Please save the tx hash after running this script.

### 2.2. Unlock the fund

Check file `unlock.js`, change your input here:

```js
// Bob address
const mnemonic = "<BOB_MNEMONIC>";

...

const guessingNumber = "42";

const allUTxOs = await lucid.utxosAt(scriptAddress);
const ownerUTxO = allUTxOs.find(
  (utxo) => utxo.txHash == "<TX_HASH_TO_UNLOCK>" // Your tx hash from lock.js
);
console.log("ownerUTxO: ", ownerUTxO);
```

Run script:

```sh
node unlock.js
```
