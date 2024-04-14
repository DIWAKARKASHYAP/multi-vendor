const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
    "/process",
    catchAsyncErrors(async (req, res, next) => {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Becodemy",
            },
        });
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret,
        });
    })
);

router.get(
    "/stripeapikey",
    catchAsyncErrors(async (req, res, next) => {
        res.status(200).json({
            stripeApikey:
                "pk_test_51OMPNBSHA6kZM5pL3H3l6VbsgaTVGjRbbMrcROh5h0AEP9g8KW8Ritv45SJZ1mKCyvnVEQk69BHlVyF4UpFGHAnS00ANakFmLv",
        });
    })
);

module.exports = router;
