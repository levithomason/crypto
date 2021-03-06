import { TokenList } from "@uniswap/token-lists";
import {
  CoinGeckoChainID,
  TokenAddress,
  CoinGeckoTokenResponse,
} from "../types";
import { rateLimit } from "./rateLimit";

const rateLimitMS = (60 * 1000) / 50; // 50 calls per minute

const get = rateLimit(rateLimitMS, async (url: string) => {
  const res = await fetch(url);
  return await res.json();
});

const BASE_URL = "https://api.coingecko.com/api/v3";

export const tokenPrice = async (
  id: CoinGeckoChainID,
  contractAddresses: TokenAddress[]
): Promise<{
  [key in TokenAddress]: CoinGeckoTokenResponse;
}> =>
  await get(
    `${BASE_URL}/simple/token_price/${id}?contract_addresses=${contractAddresses}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
  );

export const price = async (
  tokenIds: string[]
): Promise<{ [key in CoinGeckoChainID]: CoinGeckoTokenResponse }> =>
  await get(
    `${BASE_URL}/simple/price?ids=${tokenIds.join()}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
  );

export const coins = async () => await get(`${BASE_URL}/coins/list`);

export const tokenList = async (): Promise<TokenList> =>
  await get(`https://tokens.coingecko.com/uniswap/all.json`);

export const assetPlatforms = async () =>
  await get(`${BASE_URL}/asset_platforms`);

// const coinGeckoAssetPlatforms = [
//   {
//     id: "factom",
//     chain_identifier: null,
//     name: "Factom",
//     shortname: "",
//   },
//   {
//     id: "openledger",
//     chain_identifier: null,
//     name: "OpenLedger",
//     shortname: "",
//   },
//   {
//     id: "cosmos",
//     chain_identifier: null,
//     name: "Cosmos",
//     shortname: "",
//   },
//   {
//     id: "binancecoin",
//     chain_identifier: null,
//     name: "Binance Coin",
//     shortname: "",
//   },
//   {
//     id: "metaverse-etp",
//     chain_identifier: null,
//     name: "Metaverse ETP",
//     shortname: "",
//   },
//   {
//     id: "nem",
//     chain_identifier: null,
//     name: "NEM",
//     shortname: "",
//   },
//   {
//     id: "icon",
//     chain_identifier: null,
//     name: "ICON",
//     shortname: "",
//   },
//   {
//     id: "waves",
//     chain_identifier: null,
//     name: "Waves",
//     shortname: "",
//   },
//   {
//     id: "kava",
//     chain_identifier: null,
//     name: "Kava",
//     shortname: "",
//   },
//   {
//     id: "stratis",
//     chain_identifier: null,
//     name: "Stratis",
//     shortname: "",
//   },
//   {
//     id: "algorand",
//     chain_identifier: null,
//     name: "Algorand",
//     shortname: "",
//   },
//   {
//     id: "nuls",
//     chain_identifier: null,
//     name: "Nuls",
//     shortname: "",
//   },
//   {
//     id: "qtum",
//     chain_identifier: null,
//     name: "Qtum",
//     shortname: "",
//   },
//   {
//     id: "stellar",
//     chain_identifier: null,
//     name: "Stellar",
//     shortname: "",
//   },
//   {
//     id: "nxt",
//     chain_identifier: null,
//     name: "NXT",
//     shortname: "",
//   },
//   {
//     id: "ardor",
//     chain_identifier: null,
//     name: "Ardor",
//     shortname: "",
//   },
//   {
//     id: "ontology",
//     chain_identifier: null,
//     name: "Ontology",
//     shortname: "",
//   },
//   {
//     id: "eos",
//     chain_identifier: null,
//     name: "EOS",
//     shortname: "",
//   },
//   {
//     id: "vechain",
//     chain_identifier: null,
//     name: "VeChain",
//     shortname: "",
//   },
//   {
//     id: "omni",
//     chain_identifier: null,
//     name: "Omni",
//     shortname: "",
//   },
//   {
//     id: "counterparty",
//     chain_identifier: null,
//     name: "Counterparty",
//     shortname: "",
//   },
//   {
//     id: "klay-token",
//     chain_identifier: null,
//     name: "Klaytn",
//     shortname: "",
//   },
//   {
//     id: "chiliz",
//     chain_identifier: null,
//     name: "Chiliz",
//     shortname: "",
//   },
//   {
//     id: "bitshares",
//     chain_identifier: null,
//     name: "BitShares",
//     shortname: "",
//   },
//   {
//     id: "neo",
//     chain_identifier: null,
//     name: "NEO",
//     shortname: "",
//   },
//   {
//     id: "super-zero",
//     chain_identifier: null,
//     name: "Sero",
//     shortname: "",
//   },
//   {
//     id: "ethereum-classic",
//     chain_identifier: null,
//     name: "Ethereum Classic",
//     shortname: "",
//   },
//   {
//     id: "tron",
//     chain_identifier: null,
//     name: "TRON",
//     shortname: "",
//   },
//   {
//     id: "tezos",
//     chain_identifier: null,
//     name: "Tezos",
//     shortname: "",
//   },
//   {
//     id: "komodo",
//     chain_identifier: null,
//     name: "Komodo",
//     shortname: "",
//   },
//   {
//     id: "rootstock",
//     chain_identifier: null,
//     name: "Rootstock RSK",
//     shortname: "",
//   },
//   {
//     id: "achain",
//     chain_identifier: null,
//     name: "Achain",
//     shortname: "",
//   },
//   {
//     id: "solana",
//     chain_identifier: null,
//     name: "Solana",
//     shortname: "",
//   },
//   {
//     id: "vite",
//     chain_identifier: null,
//     name: "Vite",
//     shortname: "",
//   },
//   {
//     id: "telos",
//     chain_identifier: null,
//     name: "Telos",
//     shortname: "",
//   },
//   {
//     id: "gochain",
//     chain_identifier: null,
//     name: "GoChain",
//     shortname: "",
//   },
//   {
//     id: "wanchain",
//     chain_identifier: null,
//     name: "Wanchain",
//     shortname: "",
//   },
//   {
//     id: "enq-enecuum",
//     chain_identifier: null,
//     name: "Enecuum",
//     shortname: "",
//   },
//   {
//     id: "mdex",
//     chain_identifier: null,
//     name: "Mdex",
//     shortname: "",
//   },
//   {
//     id: "fantom",
//     chain_identifier: 250,
//     name: "Fantom",
//     shortname: "",
//   },
//   {
//     id: "cronos",
//     chain_identifier: 25,
//     name: "Cronos",
//     shortname: "CRO",
//   },
//   {
//     id: "kusama",
//     chain_identifier: null,
//     name: "Kusama",
//     shortname: "",
//   },
//   {
//     id: "bitcoin-cash",
//     chain_identifier: null,
//     name: "Simple Ledger Protocol (Bitcoin Cash)",
//     shortname: "SLP",
//   },
//   {
//     id: "okex-chain",
//     chain_identifier: 66,
//     name: "OKExChain",
//     shortname: "OKEx",
//   },
//   {
//     id: "tomochain",
//     chain_identifier: 88,
//     name: "TomoChain",
//     shortname: "",
//   },
//   {
//     id: "avalanche",
//     chain_identifier: 43114,
//     name: "Avalanche",
//     shortname: "AVAX",
//   },
//   {
//     id: "zilliqa",
//     chain_identifier: null,
//     name: "Zilliqa",
//     shortname: "",
//   },
//   {
//     id: "iotex",
//     chain_identifier: null,
//     name: "IoTeX",
//     shortname: "iotex",
//   },
//   {
//     id: "arbitrum-one",
//     chain_identifier: 42161,
//     name: "Arbitrum One",
//     shortname: "Arbitrum",
//   },
//   {
//     id: "fusion-network",
//     chain_identifier: null,
//     name: "Fusion Network",
//     shortname: "fusion-network",
//   },
//   {
//     id: "huobi-token",
//     chain_identifier: 128,
//     name: "Huobi ECO Chain Mainnet",
//     shortname: "HECO",
//   },
//   {
//     id: "osmosis",
//     chain_identifier: null,
//     name: "Osmosis",
//     shortname: "Osmo",
//   },
//   {
//     id: "terra",
//     chain_identifier: null,
//     name: "Terra",
//     shortname: "",
//   },
//   {
//     id: "celo",
//     chain_identifier: 42220,
//     name: "Celo",
//     shortname: "celo",
//   },
//   {
//     id: "harmony-shard-0",
//     chain_identifier: 1666600000,
//     name: "Harmony Shard 0",
//     shortname: "Harmony Shard 0",
//   },
//   {
//     id: "kucoin-community-chain",
//     chain_identifier: 321,
//     name: "Kucoin Community Chain",
//     shortname: "KCC",
//   },
//   {
//     id: "",
//     chain_identifier: null,
//     name: "XDC Network",
//     shortname: "xdc xinfin",
//   },
//   {
//     id: "hoo",
//     chain_identifier: null,
//     name: "Hoo",
//     shortname: "Hoo",
//   },
//   {
//     id: "Bitcichain",
//     chain_identifier: null,
//     name: "Bitcichain",
//     shortname: "Bitcichain",
//   },
//   {
//     id: "",
//     chain_identifier: null,
//     name: "Hedera Hashgraph",
//     shortname: "hashgraph",
//   },
//   {
//     id: "kardiachain",
//     chain_identifier: null,
//     name: "KardiaChain",
//     shortname: "",
//   },
//   {
//     id: "",
//     chain_identifier: null,
//     name: "Yocoin",
//     shortname: "yocoin",
//   },
//   {
//     id: "optimistic-ethereum",
//     chain_identifier: 10,
//     name: "Optimistic Ethereum",
//     shortname: "Optimistic Ethereum",
//   },
//   {
//     id: "",
//     chain_identifier: null,
//     name: "Near Protocol",
//     shortname: "near-protocol",
//   },
//   {
//     id: "sora",
//     chain_identifier: null,
//     name: "Sora",
//     shortname: "",
//   },
//   {
//     id: "secret",
//     chain_identifier: null,
//     name: "Secret",
//     shortname: "",
//   },
//   {
//     id: "moonriver",
//     chain_identifier: 1285,
//     name: "Moonriver",
//     shortname: "moonriver",
//   },
//   {
//     id: "xrp",
//     chain_identifier: null,
//     name: "XRP Ledger",
//     shortname: "xrp",
//   },
//   {
//     id: "ethereum",
//     chain_identifier: 1,
//     name: "ethereum",
//     shortname: "",
//   },
//   {
//     id: null,
//     chain_identifier: null,
//     name: "Kardiachain",
//     shortname: "",
//   },
//   {
//     id: "polygon-pos",
//     chain_identifier: 137,
//     name: "Polygon POS",
//     shortname: "MATIC",
//   },
//   {
//     id: "boba",
//     chain_identifier: 288,
//     name: "Boba Network",
//     shortname: "",
//   },
//   {
//     id: "binance-smart-chain",
//     chain_identifier: 56,
//     name: "Binance Smart Chain",
//     shortname: "BSC",
//   },
//   {
//     id: "polkadot",
//     chain_identifier: null,
//     name: "Polkadot",
//     shortname: "",
//   },
//   {
//     id: "thorchain",
//     chain_identifier: null,
//     name: "Thorchain",
//     shortname: "",
//   },
//   {
//     id: "ronin",
//     chain_identifier: null,
//     name: "Ronin",
//     shortname: "ron",
//   },
//   {
//     id: "cardano",
//     chain_identifier: null,
//     name: "Cardano",
//     shortname: "",
//   },
//   {
//     id: "elrond",
//     chain_identifier: null,
//     name: "Elrond",
//     shortname: "elrond",
//   },
//   {
//     id: "xdai",
//     chain_identifier: 100,
//     name: "xDAI",
//     shortname: "",
//   },
// ];
