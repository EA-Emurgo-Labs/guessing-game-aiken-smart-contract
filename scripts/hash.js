import * as sha3 from "js-sha3";

const secretNumber = "42";
const hashHex = sha3.default.sha3_256(secretNumber).toUpperCase();

console.log("SHA3-256 Hash:", hashHex);
