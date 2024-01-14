const contracts = {
  56: [
    {
      chainId: "56",
      name: "bsc",
      contracts: {
        BodhiItemTagger: {
          address: "0x2e19198e4680f89a67cccae83c9a027f0669b5dd",
          abi: [
            {
              inputs: [
                { internalType: "string", name: "_vectorName", type: "string" },
                { internalType: "string", name: "_vectorDescription", type: "string" },
                { internalType: "string", name: "_tagFormat", type: "string" },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, internalType: "uint256", name: "tagIndex", type: "uint256" },
                { indexed: false, internalType: "bool", name: "decide", type: "bool" },
              ],
              name: "JudgeSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, internalType: "address", name: "tagger", type: "address" },
                { indexed: false, internalType: "string", name: "itemId", type: "string" },
                { indexed: false, internalType: "string", name: "metadata", type: "string" },
              ],
              name: "TagSet",
              type: "event",
            },
            {
              inputs: [],
              name: "chairperson",
              outputs: [{ internalType: "address", name: "", type: "address" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "judgeIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "uint256", name: "_tagIndex", type: "uint256" },
                { internalType: "bool", name: "_decide", type: "bool" },
              ],
              name: "judgeTag",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "judges",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tagFormat",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tagIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "string", name: "_itemId", type: "string" },
                { internalType: "string", name: "_metadata", type: "string" },
              ],
              name: "tagItem",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "tags",
              outputs: [
                { internalType: "string", name: "itemId", type: "string" },
                { internalType: "string", name: "metadata", type: "string" },
                { internalType: "address", name: "creator", type: "address" },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "vectorDescription",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "vectorName",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        GalaxeItemTagger: {
          address: "0x15875fb016b05c047523820601ab8b23f0f02d5f",
          abi: [
            {
              inputs: [
                { internalType: "string", name: "_vectorName", type: "string" },
                { internalType: "string", name: "_vectorDescription", type: "string" },
                { internalType: "string", name: "_tagFormat", type: "string" },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, internalType: "uint256", name: "tagIndex", type: "uint256" },
                { indexed: false, internalType: "bool", name: "decide", type: "bool" },
              ],
              name: "JudgeSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, internalType: "address", name: "tagger", type: "address" },
                { indexed: false, internalType: "string", name: "itemId", type: "string" },
                { indexed: false, internalType: "string", name: "metadata", type: "string" },
              ],
              name: "TagSet",
              type: "event",
            },
            {
              inputs: [],
              name: "chairperson",
              outputs: [{ internalType: "address", name: "", type: "address" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "judgeIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "uint256", name: "_tagIndex", type: "uint256" },
                { internalType: "bool", name: "_decide", type: "bool" },
              ],
              name: "judgeTag",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "judges",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tagFormat",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tagIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "string", name: "_itemId", type: "string" },
                { internalType: "string", name: "_metadata", type: "string" },
              ],
              name: "tagItem",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "tags",
              outputs: [
                { internalType: "string", name: "itemId", type: "string" },
                { internalType: "string", name: "metadata", type: "string" },
                { internalType: "address", name: "creator", type: "address" },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "vectorDescription",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "vectorName",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
