import React from 'react';
import PaymentCard from "../PaymentCard";

const cards = [
  {
    id: 0,
    text: 'Credit Card'
  },
  {
    id: 1,
    text: 'PayPal'
  }
];

const OptionsSection = ({ active, select }) => (
  <>
    {
      cards.map(card => <PaymentCard children={card.text} onclick={() => select(card)} active={active && card.id === active.id} key={card.id}/>)
    }
  </>
);

export default OptionsSection;
