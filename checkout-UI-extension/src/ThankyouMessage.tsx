import {
    reactExtension,
    BlockStack, 
    View,
    Heading,
    Text,
    TextBlock,
    Button,
    useSettings, 
    useShippingOptionTarget,
    useShippingAddress,
    useCartLines,
    useApi,
    Link,
  } from '@shopify/ui-extensions-react/checkout';
  
   //1. Extension target after the Thankyou Map
   const thankYourMessage =  reactExtension(
    'purchase.thank-you.block.render',
    () => <ThankyouExtension />
  );
  export { thankYourMessage }

     //1. Extension target after the Thankyou Map
     const orderDetailsMessage =  reactExtension(
      'customer-account.order-status.block.render',
      () => <OrderStatusMessage />
    );
    export { orderDetailsMessage }

  
  function OrderStatusMessage() {
    // 2. Use the extension API to gather context from the checkout and shop
    const {cost, shop} = useApi();
    const cartLineItems = useCartLines();

    const {membership_header,membership_body,membership_button_text,membership_button_url,membership_button_target,thankyou_title,thankyou_bike_title,Thankyou_bike_message} = useSettings();

    const bikeProducts = cartLineItems.filter(product =>
        product.merchandise.product.productType.toLowerCase() === 'bike'
      );
  
    //Render message if there are any bike or re-certified bike products

    if (bikeProducts.length > 0 ) {
          return (  
            <BlockStack> 
                <View border="base" borderRadius="base" padding="base">  
                    {membership_header ?(
                    <Heading level={1}>{membership_header}</Heading>
                    )
                    : null}
                    {membership_body ?(
                    <TextBlock>{membership_body}</TextBlock>
                    )
                    : null} 

                    {membership_button_target ?(
                    <Link to={membership_button_url} external>{membership_button_text}</Link>
                    )
                    : <Link to={membership_button_url}>{membership_button_text}</Link>
                    } 
                    </View>
                    <View border="base" borderRadius="base" padding="base">             
                    {thankyou_bike_title ?(
                        <Heading level={1}>{thankyou_bike_title}</Heading>
                    )
                    : null}
                    {Thankyou_bike_message ?(
                        <TextBlock>{Thankyou_bike_message}</TextBlock>
                    )
                    : null}              
                </View>
            </BlockStack>
          )      
    } else {
      return (    
        <BlockStack> 
            <View border="base" borderRadius="base" padding="base">  
                {membership_header ?(
                <Heading level={1}>{membership_header}</Heading>
                )
                : null}
                {membership_body ?(
                <TextBlock>{membership_body}</TextBlock>
                )
                : null}
                 {membership_button_target ?(
                    <Link to={membership_button_url} external>{membership_button_text}</Link>
                    )
                    : <Link to={membership_button_url}>{membership_button_text}</Link>
                    }  
            </View>
        </BlockStack>
      )
    }
  }

   
  function ThankyouExtension() {
    // 2. Use the extension API to gather context from the checkout and shop
    const {cost, shop} = useApi();
    const cartLineItems = useCartLines();

    const {membership_header,membership_body,membership_button_text,membership_button_url,membership_button_target,thankyou_title,thankyou_bike_title,Thankyou_bike_message} = useSettings();

    const bikeProducts = cartLineItems.filter(product =>
        product.merchandise.product.productType.toLowerCase() === 'bike'
      );
  
    //Render message if there are any bike or re-certified bike products

    if (bikeProducts.length > 0 ) {
          return (  
            <BlockStack> 
                <View border="base" borderRadius="base" padding="base">  
                    {membership_header ?(
                    <Heading level={1}>{membership_header}</Heading>
                    )
                    : null}
                    {membership_body ?(
                    <TextBlock>{membership_body}</TextBlock>
                    )
                    : null} 

                    {membership_button_target ?(
                    <Link to={membership_button_url} external>{membership_button_text}</Link>
                    )
                    : <Link to={membership_button_url}>{membership_button_text}</Link>
                    } 
                    </View>
                    <View border="base" borderRadius="base" padding="base">             
                    {thankyou_bike_title ?(
                        <Heading level={1}>{thankyou_bike_title}</Heading>
                    )
                    : null}
                    {Thankyou_bike_message ?(
                        <TextBlock>{Thankyou_bike_message}</TextBlock>
                    )
                    : null}              
                </View>
            </BlockStack>
          )      
    } else {
      return (    
        <BlockStack> 
            <View border="base" borderRadius="base" padding="base">  
                {membership_header ?(
                <Heading level={1}>{membership_header}</Heading>
                )
                : null}
                {membership_body ?(
                <TextBlock>{membership_body}</TextBlock>
                )
                : null}
                 {membership_button_target ?(
                    <Link to={membership_button_url} external>{membership_button_text}</Link>
                    )
                    : <Link to={membership_button_url}>{membership_button_text}</Link>
                    }  
            </View>
        </BlockStack>
      )
    }
  }