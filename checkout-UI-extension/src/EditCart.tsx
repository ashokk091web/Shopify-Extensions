import React, { useEffect, useState } from "react";
import {
    reactExtension,
    useSettings,     
    Heading,
    Link,
    InlineStack,
    Grid,
    Pressable,
    Tooltip,
    Icon,
    View,
    useCartLines,
    useShop,
  } from "@shopify/ui-extensions-react/checkout";
  
 
  //1. Extension target before Order summary
  const editCartData = reactExtension(
    'purchase.checkout.block.render',
    () => <EditCart />,
  );
  export { editCartData }
  
  function EditCart() {
      // Get data from checkout block settings
    const {edit_cart,shop_url,home_url,bike_querystring,amexbikebenefit,amexbikeoffer,enable_editcart_module} = useSettings();
    const cartLines = useCartLines();
    
    const containsAmexBikeBenefit = cartLines.some(line => 
      line.attributes.some(attr => attr.key === "_amexBikeBenefit")
    );

    const containsAmexBikeOffer = cartLines.some(line => 
      line.attributes.some(attr => attr.key === "_amexBikeOffer")
    );
    
    // const enable_editcart_module = true;
    // const edit_cart = "Edit Cart";
    // const home_url = 'http://staging.equinoxplus.com/';
    // const shop_url = 'https://shopstaging.equinoxplus.com/';
    // const bike_querystring = 'bike/purchase/accessories?showBag=true&editCartMode=true';
    // const amexbikebenefit = '&amexbikebenefit=true';
    // const amexbikeoffer = '&amexbikeoffer=true'

    console.log('enable_editcart_module ==>', enable_editcart_module)
    console.log("Cart line Items ==>", cartLines)
    if(enable_editcart_module) {
      let editCartBikeUrl;
      if(containsAmexBikeOffer === false && containsAmexBikeBenefit === true){       
        editCartBikeUrl = home_url + bike_querystring+amexbikebenefit;
      } else if(containsAmexBikeBenefit === true && containsAmexBikeOffer === true){
        editCartBikeUrl = home_url+bike_querystring+amexbikeoffer;
      } else {
        editCartBikeUrl = home_url+bike_querystring;
      }   
      const editCartUrl = shop_url+"/cart";
      const shopDetails = useShop();
      const cartLineItems = useCartLines();   
      const bikeProductsExist = cartLineItems.filter(product =>
        product.merchandise.product.productType.toLowerCase() === 'bike'
      );

      // Render a UI
      return ( 
        <Grid columns={['fill', 'auto']} spacing="loose"> 
        <InlineStack spacing="tight" blockAlignment="center">
        	<View>
          <Heading level={1}>Summary</Heading>
          </View>   
          <View>
          <Pressable
            overlay={
              <Tooltip>
                In case we need to contact you about
                your order
              </Tooltip>
            }
          >
            <Icon source="questionFill" />
          </Pressable>
          </View>
        </InlineStack>
          <View>
          {
          bikeProductsExist.length > 0 ? (
            <Link to={editCartBikeUrl} external={false}>{edit_cart}</Link>
          )
          : (
            <Link to={editCartUrl} external={false}>{edit_cart}</Link>
          )
          }
          </View>          
        </Grid> 
      )
    }
  }