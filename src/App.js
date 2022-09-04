import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Moralis from "moralis";
import homepage from "./image/homepage.jpg";
import "./App.css";

const App = () => {
  const { isAuthenticated, user } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");

  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };

  const updateName = async () => {
    const _User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(_User);
    query.equalTo("objectId", user.id);
    const results = await query.find({ useMasterKey: true });

    results[0].set("name", name);
    results[0]
      .save()
      .then(() => {
        alert("Update success, please refresh the website to look");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBalance = () => {
    const options = {
      chain: "mumbai",
    };
    Web3Api.account.getNativeBalance(options).then((matic) => {
      matic = Moralis.Units.FromWei(matic.balance, 18);

      setBalance(matic.slice(0, 5));
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getBalance();

      enableWeb3();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className="container">
        <img
          className="background"
          src={homepage}
          alt="This is background image"
        />
      </div>
    );
  }
  return (
    <div>
      <h1>Please connect your wallet</h1>
    </div>
  );
};

export default App;
{
  /* <section className="info">
  <h2>Your address : {user.get("ethAddress").slice(0, 8) + "..."}</h2>
  <h2>Name : {user.get("name")}</h2>
  <h2>Balance : {balance} MATIC</h2>
  <div className="submit">
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <button className="btn" onClick={updateName}>
      Update name
    </button>
  </div>
</section>; */
}
