import { useEffect, useState } from 'react';
import {
    reactExtension,
    BlockStack, 
    Text,
    useSettings,
    useCartLines,
  } from "@shopify/ui-extensions-react/checkout";

  //1. Extension target after the shipping Method
  const afterShippingMethod =  reactExtension(
    'purchase.checkout.shipping-option-list.render-after',
    () => <App />,
  );
  export { afterShippingMethod }
  
  function App(){
    const cartLineItems = useCartLines();
 
    const {jb_hunt_desc,bike_extra_shipping_info,recertified_shipping_info,order_cutoff_sameday_shipping,enable_restricted_shipping,restricted_state_list} = useSettings();

    const bikeProducts = cartLineItems.filter(product =>
      product.merchandise.product.productType.toLowerCase() === 'bike'
    );

    const reCertifedBikeProducts = cartLineItems.filter(product =>
      product.merchandise.product.productType.toLowerCase() === 're-certified bike'
    );


    //Render message if there are any bike or re-certified bike products
    if (bikeProducts.length > 0 || reCertifedBikeProducts.length > 0) {
        if(bikeProducts.length > 0) {
          return (    
            <BlockStack>   
              {jb_hunt_desc ?(
                <Text>{jb_hunt_desc}</Text>
              )
              : null}
              {bike_extra_shipping_info ?(
                <Text>{bike_extra_shipping_info}</Text>
              )
              : null}              
            </BlockStack>
          )
        }
        if(reCertifedBikeProducts.length > 0) {
          return (    
            <BlockStack>   
              {recertified_shipping_info ?(
                <Text>{recertified_shipping_info}</Text>
              )
              : null}                         
            </BlockStack>
          )
        }
      
    } else {
      return (    
        <BlockStack>   
          {order_cutoff_sameday_shipping ?(
            <Text>{order_cutoff_sameday_shipping}</Text>
          )
          : null}
        </BlockStack>
      )
    }
   
  }
  