import { Lucid, Blockfrost, Data, Constr } from "@lucid-evolution/lucid";
import { validatorToAddress } from "@lucid-evolution/utils";
import contract from "../plutus.json" assert { type: "json" };
import * as sha3 from "js-sha3";

(async function main() {
  const lucid = await Lucid(
    new Blockfrost(
      "https://cardano-preprod.blockfrost.io/api/v0",
      "<YOUR_API_KEY>"
    ),
    "Preprod"
  );

  const spendValidator = {
    type: "PlutusV3",
    script: contract.validators[0].compiledCode,
  };

  const scriptAddress = validatorToAddress("Preprod", spendValidator);
  console.log("scriptAddress: ", scriptAddress);

  // Alice address
  const mnemonic = "<ALICE_MNEMONIC";

  lucid.selectWallet.fromSeed(mnemonic);

  const senderAddress = await lucid.wallet().address();
  console.log("senderAddress: ", senderAddress);

  const secretNumber = "42";
  const hashHex = sha3.default.sha3_256(secretNumber).toUpperCase();
  console.log("hashHex: ", hashHex);

  const datum = Data.to(new Constr(0, [hashHex]));
  console.log("datum: ", datum);

  const tx = await lucid
    .newTx()
    .pay.ToContract(
      scriptAddress,
      { kind: "inline", value: datum },
      { lovelace: 5_000_000n }
    )
    .complete();

  const signedTx = await tx.sign.withWallet().complete();
  const txHash = await signedTx.submit();
  console.log("txHash: ", txHash);
})();
