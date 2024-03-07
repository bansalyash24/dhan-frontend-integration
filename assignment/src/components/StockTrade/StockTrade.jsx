import { useState } from "react";
import styles from "./StockTrade.module.css";
import { useCookies } from "react-cookie";
import { handleOrder } from "../../utils";

function StockTrade() {
  const [shareObj, setShareObj] = useState({
    tradingSymbol: "",
    securityId: "",
    price: "",
  });
  const [cookies] = useCookies('token');
  const handleInput = (e) => {
    setShareObj({ ...shareObj, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h3>Buy/Sell Orders</h3>
      <input
        type="text"
        name="tradingSymbol"
        placeholder="Enter Trading Symbol"
        value={shareObj?.tradingSymbol}
        onChange={(e) => {
          handleInput(e);
        }}
        className={styles.inputField}
      />
      <input
        type="text"
        name="securityId"
        id=""
        placeholder="Enter Security Id"
        value={shareObj?.securityId}
        className={styles.inputField}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <input
        type="number"
        name="price"
        id=""
        min="0"
        placeholder="Enter Price"
        value={shareObj?.price}
        className={styles.inputField}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <button
        className={styles.buyBtn}
        onClick={() => {
          handleOrder("BUY", shareObj, cookies);
          setShareObj({ tradingSymbol: "", securityId: "", price: "" });
        }}
      >
        Buy
      </button>
      <button
        className={styles.sellBtn}
        onClick={() => {
          handleOrder("SELL", shareObj, cookies);
          setShareObj({ tradingSymbol: "", securityId: "", price: "" });
        }}
      >
        Sell
      </button>
    </>
  );
}

export default StockTrade;
