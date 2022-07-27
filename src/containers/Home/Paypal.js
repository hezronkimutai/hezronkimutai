import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export default class Paypal extends Component {

  render() {
    return (
      <PayPalButton
        options={{
          clientId: process.env.REACT_APP_CLIENT_ID,
          vault: true
        }}
        createSubscription={(data, actions) => {
          console.log(data);
          return actions.subscription.create({
            plan_id: process.env.REACT_APP_PLAN_ID
          });
        }}
        onApprove={(data, actions) => {
          return actions.subscription.get().then(async function (details) {
            console.log(details, data);
            console.log("subscription complete");
            // return await apiCall.post("/payments/subscription/paypal", {
            //   orderId: data.orderID,
            //   subscriptionId: data.subscriptionID,
            //   planId: process.env.REACT_APP_PLAN_ID,
            // });
          });
        }}
      />
    );
  }
}
