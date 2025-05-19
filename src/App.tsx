import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";
import "./App.css";

const provider = new IFrameEthereumProvider();
const transport = custom({
  request: ({ method, params }) => provider.send(method, params),
});

const client = createWalletClient({
  chain: mainnet,
  transport: transport,
});

function App() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    client.getAddresses().then(([address]) => {
      console.log("getAddress: ", address);
      setAddress(address);
    });

    function onAccountsChanged([address]: string[]) {
      console.log("accountsChanged: ", address);
      setAddress(address);
    }

    provider.on("accountsChanged", onAccountsChanged);
    return () => {
      provider.off("accountsChanged", onAccountsChanged);
    };
  }, []);

  return (
    <>
      <h1>Ledger iframe provider with viem</h1>
      <div className="card">
        <h2>Account</h2>
        <div>address: {address}</div>
      </div>
    </>
  );
}

export default App;
