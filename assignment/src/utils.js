import { toast } from "react-toastify";

export const handleOrder = async (orderType,obj,cookies) => {
    console.log(cookies)
    if(!obj?.tradingSymbol || !obj?.price || !obj?.securityId) {
      if(!obj?.tradingSymbol) toast.error("Please enter Share Name")
      if(!obj?.price) toast.error("Price value should be greater than 0")
      if(!obj?.securityId) toast.error("Security Id is mandatory")
      return
    }
    const url = "https://easy-teal-salmon-belt.cyclic.app/api/orders";
    const bodyObject = {
      dhanClientId: "1000475514",
      correlationId: "NA",
      transactionType: orderType,
      exchangeSegment: "NSE_EQ",
      productType: "INTRADAY",
      orderType: "LIMIT",
      validity: "DAY",
      quantity: 1,
      disclosedQuantity: 0,
      ...obj
    }
    const options = {
      method: "POST",
      headers: {
        "access-token": cookies?.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bodyObject)
    };
    console.log(options)
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if(data.success){
        toast.success(data.message)
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message)
    }
  };