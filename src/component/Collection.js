import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { contractAddress } from "../abi/abi";
import background from "../image/background.png";
import Moralis from "moralis";
import MockToken from "../image/MockToken.png";
import "./css/Collection.css";

const Collection = () => {
  const [tokens, setTokens] = useState([]);
  const { isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const getUserNFT = async () => {
    const options = {
      address: contractAddress,
      chain: "mumbai",
    };
    const nftOwners = await Web3Api.token.getNFTOwners(options);
    let userNFT = nftOwners.result.filter(
      (nft) => nft.token_id < 100 && nft.owner_of == user.get("ethAddress")
    );

    let _token = [];
    userNFT.forEach((item) => {
      let img = JSON.parse(item.metadata);
      let token = {
        id: item.token_id,
        img: img.image,
      };
      _token.push(token);
    });
    setTokens(_token);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserNFT();
    }
  }, [isAuthenticated]);

  return (
    <div className="box">
      <img
        className="background"
        src={background}
        alt="This is background image"
      />
      <div className="collection">
        <section className="showImg">
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
          <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>
        </section>
        ;
      </div>
    </div>
  );
};
export default Collection;
// {
//   tokens.map((token) => {
//     return (
//       <div key={token.id}>
//         <Link to={`/collection/${token.id}`}>
//           <img src={token.img} />
//         </Link>
//         <button>{token.id}</button>
//       </div>
//     );
//   });
// }
