import React, { Component } from 'react';
import { CallToactionBtn } from './LandingDiv';
import { PayPalButton } from "react-paypal-button-v2";
import { } from '../'
export class Paypal extends Component {

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
const WhyMe = () => (
  <div className="" id="">
    <div style={{}} className="mx-auto  py-8">
      <h1
        data-aos="flip-right"
        className=" mx-auto text-4xl text-center font-bold"
      >
        WHY ME?
      </h1>
      <div style={{}} className="mx-auto w-10/12 flex whyMe">
        <img className="whyMeLeft h-48 w-48 p-3 m-auto" src="https://res.cloudinary.com/hezzie/image/upload/v1602164222/imageedit_88_7354735526_ctyjka.png" alt="hezronKimutai" />
        <div className="whyMeRight shadow p-4">
          <h3
            className="text-l"
            data-aos="fade-left"
          >
            Over the years, I have acquired relevant skills and experience,
            which I shall bring to your organization.
            I have also worked tirelessly on my
            communication abilities and teamwork
            skills, which I will put to use in my future career,
            which would be in your organization if I am selected for the position.
            I have given my 100% effort in my past
            companies, and this has enabled me to
            recognize my capabilities and limitations.
            If I channelize them further, they will
            bring fruitful results to me and also to your esteemed organization.
          </h3>
          <CallToactionBtn className="text-2xl flex font-semibold my-1 mx-auto p-3 bg-blue-700 rounded text-gray-300 delay-150 duration-300 ease-in-out " onClick={() => 0} displayText="HIRE ME" />
        </div>
      </div>
    </div>

  </div>
);

export default WhyMe;
