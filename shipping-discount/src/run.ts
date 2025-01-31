import type {
  RunInput,
  FunctionRunResult
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discounts: [],
};

type Configuration = {};

export function run(input: RunInput): FunctionRunResult {
    // Calculate the order total from input
    const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
    console.log("Cart total is not high enough, no need to hide the payment method.==>", cartTotal);

    let deliveryOptions: {
      deliveryOption: {
        handle: string;
      };
    }[] = [];

    // Check if the order total is less than $75
  if (cartTotal < 75) {
    // Log to STDERR for debugging purposes
    console.error("Cart total is less than $75, no discount applied.");
    return EMPTY_DISCOUNT;
  } else {    
  
    for(const deliveryGroup of input.cart.deliveryGroups) {
      for(const option of deliveryGroup.deliveryOptions) {
        if(option.title === "UPS Ground"){
          deliveryOptions.push({
            deliveryOption: {
              handle: option.handle,
            }, 
          })          
        }
      }
    }
  }

  return {
    discounts: [
      {
        targets: deliveryOptions,
        value: {
          fixedAmount: {
            amount: 9
          }
        }

      }
    ]
  }
  ;
};