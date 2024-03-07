import { useState } from "react";
import styles from "./StockTable.module.css";
import { ShimmerTable } from "react-shimmer-effects";
import Modal from "../Modal/Modal";
import { useCookies } from "react-cookie";
import { handleOrder } from "../../utils";

const StockTable = ({ positions, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies]=useCookies('token')
  const [modalValue, setModalValue] = useState(null);
  const [positionValue,setPositionValue]=useState(null)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handlePosition = (position) => {
    if(position.netQty==0) return
    else if (position.netQty > 0) {
      setModalValue({
        positionType:"SELL",
        qtyValue:position?.netQty,
        priceValue:position.costPrice.toFixed(2)
      })
      setPositionValue(position)
    }else{
      setModalValue({
        positionType:"BUY",
        qtyValue:Math.abs(position?.netQty),
        priceValue:position.costPrice.toFixed(2)
      })
      setPositionValue(position)
    }
    openModal();
  };
  if (isLoading) {
    return <ShimmerTable row={2} col={8} />;
  } else
    return (
      <>
        <table className={styles?.stockTable}>
          <thead>
            <tr>
              <th className={styles.tableHead}>Symbol</th>
              <th className={styles.tableHead}>Quantity</th>
              <th className={styles.tableHead}>Order</th>
              <th className={styles.tableHead}>Position</th>
              <th className={styles.tableHead}>Buy Price</th>
              <th className={styles.tableHead}>Sell Price</th>
              <th className={styles.tableHead}>Current Price</th>
              <th className={styles.tableHead}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr
                key={index}
                className={
                  position.positionType == "CLOSED"
                    ? styles.positionClosed
                    : styles.positionOpened
                }
                onClick={() => handlePosition(position)}
              >
                <td>{position.tradingSymbol}</td>
                <td>{position.netQty}</td>
                <td>{position.productType}</td>
                <td>{position.positionType}</td>
                <td>
                  {position?.netQty > 0 ? position?.buyAvg?.toFixed(2) : "-"}
                </td>
                <td>
                  {position?.netQty < 0 ? position?.sellAvg?.toFixed(2) : "-"}
                </td>
                <td>{position?.costPrice?.toFixed(2)}</td>
                <td
                  className={
                    +position.realizedProfit < 0
                      ? styles.negativeVal
                      : styles.positiveVal
                  }
                  style={{fontWeight:"1000"}}
                >
                  {position.realizedProfit.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexDirection:"column",padding:"2rem"}}>
            <span>
              <input
                type="number"
                min={0}
                max={positionValue?.netQty}
                value={modalValue?.qtyValue}
                onChange={(e)=>{
                  setModalValue({...modalValue,qtyValue:e.target.value})
                }}
                className={styles.inputField}
              />
              <input
                type="number"
                min={0}
                value={modalValue?.priceValue}
                onChange={(e)=>{
                  setModalValue({...modalValue,priceValue:e.target.value})
                }}
                className={styles.inputField}
              />
            </span>
            <button onClick={()=>{
              handleOrder(modalValue?.positionType,{
                tradingSymbol: positionValue?.tradingSymbol,
                securityId: positionValue?.securityId,
                quantity: modalValue?.qtyValue,
                price:modalValue.priceValue
              },cookies)
              closeModal()
            }} className={modalValue?.positionType==='SELL'?(styles.sellBtn):(styles.buyBtn)}>{modalValue?.positionType}</button>
          </div>
        </Modal>
      </>
    );
};

export default StockTable;
