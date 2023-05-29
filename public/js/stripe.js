/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51ND0CuSHnUw8VMHU8OwOPxuHvNFIvjPFIwgRLT4VwsxAU6TwjU7M1uKgR4xvKAIDeawh4BvHTeEwcL2KkVxCrOii00TQA1u9FX'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
