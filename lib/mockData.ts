import { UserTransactionHistoryResponse } from './types';

export const mockTransactionData: UserTransactionHistoryResponse = {
  "userTransactionHistory": {
    "items": [
      {
        "enabled": true,
        "reserve": {
          "market": {
            "name": "AaveV3Ethereum",
            "chain": {
              "name": "Ethereum",
              "icon": "https://statics.aave.com/ethereum.svg",
              "chainId": 1,
              "explorerUrl": "https://etherscan.io",
              "isTestnet": false,
              "nativeWrappedToken": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
            },
            "address": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
            "icon": "https://statics.aave.com/ethereum.svg"
          },
          "underlyingToken": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "chainId": 1,
            "name": "Tether USD",
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "symbol": "USDT",
            "decimals": 6
          },
          "aToken": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "chainId": 1,
            "name": "Tether USD",
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "symbol": "USDT",
            "decimals": 6
          },
          "vToken": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "chainId": 1,
            "name": "Tether USD",
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "symbol": "USDT",
            "decimals": 6
          },
          "usdExchangeRate": "0",
          "permitSupported": false
        },
        "blockExplorerUrl": "https://etherscan.io/tx/0x79ba5ed97d71f603d9adfc94d2be04d82a4e5105125ab8e93979c7c6a64c55f7",
        "txHash": "0x79ba5ed97d71f603d9adfc94d2be04d82a4e5105125ab8e93979c7c6a64c55f7",
        "timestamp": "2024-01-09T06:56:59+00:00"
      },
      {
        "amount": {
          "usd": "490287.5810000",
          "amount": {
            "value": "490000"
          }
        },
        "reserve": {
          "aToken": {
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "name": "Tether USD",
            "symbol": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
          },
          "underlyingToken": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6,
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "name": "Tether USD",
            "symbol": "USDT"
          },
          "market": {
            "chain": {
              "explorerUrl": "https://etherscan.io",
              "icon": "https://statics.aave.com/ethereum.svg",
              "name": "Ethereum",
              "chainId": 1,
              "isTestnet": false,
              "nativeWrappedToken": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
            },
            "name": "AaveV3Ethereum",
            "icon": "https://statics.aave.com/ethereum.svg",
            "address": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"
          }
        },
        "blockExplorerUrl": "https://etherscan.io/tx/0x79ba5ed97d71f603d9adfc94d2be04d82a4e5105125ab8e93979c7c6a64c55f7",
        "txHash": "0x79ba5ed97d71f603d9adfc94d2be04d82a4e5105125ab8e93979c7c6a64c55f7",
        "timestamp": "2024-01-09T06:56:59+00:00"
      },
      {
        "amount": {
          "amount": {
            "raw": "1205064784434",
            "value": "1205064.784434"
          },
          "usd": "1204617.77770286205204",
          "usdPerToken": "0.99962906"
        },
        "reserve": {
          "aToken": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "chainId": 1,
            "decimals": 6,
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "name": "Tether USD",
            "symbol": "USDT"
          },
          "market": {
            "address": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
            "icon": "https://statics.aave.com/ethereum.svg",
            "name": "AaveV3Ethereum"
          },
          "underlyingToken": {
            "name": "Tether USD",
            "symbol": "USDT",
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "decimals": 6,
            "chainId": 1,
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
          }
        },
        "blockExplorerUrl": "https://etherscan.io/tx/0xcb230eebf2bba713704c38f1b7f0e6dc69bef336032e0df2d33a237ff389c19d",
        "txHash": "0xcb230eebf2bba713704c38f1b7f0e6dc69bef336032e0df2d33a237ff389c19d",
        "timestamp": "2024-01-16T08:40:59+00:00"
      },
      {
        "amount": {
          "usd": "868740.83669950863486",
          "amount": {
            "value": "868556.468218"
          }
        },
        "reserve": {
          "aToken": {
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "name": "Tether USD",
            "symbol": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
          },
          "underlyingToken": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6,
            "imageUrl": "https://token-logos.family.co/asset?id=1:0xdAC17F958D2ee523a2206206994597C13D831ec7&token=USDT",
            "name": "Tether USD",
            "symbol": "USDT"
          },
          "market": {
            "chain": {
              "explorerUrl": "https://etherscan.io",
              "icon": "https://statics.aave.com/ethereum.svg",
              "name": "Ethereum",
              "chainId": 1,
              "isTestnet": false,
              "nativeWrappedToken": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
            },
            "name": "AaveV3Ethereum",
            "icon": "https://statics.aave.com/ethereum.svg",
            "address": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"
          }
        },
        "blockExplorerUrl": "https://etherscan.io/tx/0x51224d0a8c0a95881fa139cdbe61607df802b8205e57e13a926168653138ae04",
        "txHash": "0x51224d0a8c0a95881fa139cdbe61607df802b8205e57e13a926168653138ae04",
        "timestamp": "2025-01-16T02:42:11+00:00"
      }
    ]
  }
};
