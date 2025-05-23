# Ledger EVM iframe-provider example with viem

This template provides a minimal example to get viem working with Ledger iframe-provider in the dApp-browser v2.

We need to create an EIP-1193 compatible provider from the iframe-provider, you can do it this way

```ts
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { custom } from "viem";

const provider = new IFrameEthereumProvider();
const transport = custom({
  request: ({ method, params }) => provider.send(method, params),
});
```

Then we can use this provider and the transport created with viem to create the viem client wallet

```ts
import { createWalletClient } from "viem";
import { mainnet } from "viem/chains";

const client = createWalletClient({
  chain: mainnet,
  transport: transport,
});
```
