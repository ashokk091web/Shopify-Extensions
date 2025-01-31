import { useEffect, useState } from 'react';
import {
    reactExtension,   
    useCartLines,
    BlockStack,
    Text,
    useSettings,
  } from "@shopify/ui-extensions-react/checkout";
 
  //1. Extension target after the shipping Method
  const updateBundleItem =  reactExtension(
    'purchase.checkout.cart-line-item.render-after',
    () => <App />,
  );
  export { updateBundleItem }

  function App(){
    const cartLineItems = useCartLines();
    console.log("Bundle cart line items==>", cartLineItems);
    const {bike_description} = useSettings();

     // Filter out the items that are of productType "Bike"
     const bikeProductsExist = cartLineItems.filter(product =>
      product.merchandise.product.productType.toLowerCase() === 'bike'
    )
    console.log("bikesettingsData==>", bike_description)

    return (
      <BlockStack>
            {
            bikeProductsExist.length > 0 ? (
            <Text>{bike_description}</Text>  
            )
            : ""
            }
            </BlockStack> 
    )
  }


  