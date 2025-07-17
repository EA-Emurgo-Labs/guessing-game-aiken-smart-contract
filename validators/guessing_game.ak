use aiken/crypto.{sha3_256}
use cardano/transaction.{Transaction, OutputReference}

pub type Datum {
  hash: ByteArray
}

pub type Redeemer {
  guessing_number: ByteArray
}

validator guessing_game {
  spend(datum: Option<Datum>, redeemer: Redeemer, _utxo: OutputReference, _self: Transaction) {
    expect Some(Datum { hash }) = datum
    let guessing_number = redeemer.guessing_number
    let is_correct = hash == sha3_256(guessing_number)
    is_correct?
  }
}
