import {
  reactExtension,
  BlockStack, 
  Text,
  useSettings, 
  useCustomer,
} from "@shopify/ui-extensions-react/checkout";

//1. Extension target after the shipping address
const afterShoppingAddress = reactExtension(
  'purchase.checkout.delivery-address.render-after',
  () => <Extension />,
);
export { afterShoppingAddress }

function Extension() {  
const userData = useCustomer();
console.log('UserData==> ', userData);
  const {shipping_address_message} = useSettings();
  console.log({shipping_address_message});

  // Render a UI
  return (
    <BlockStack>      
      <Text>{shipping_address_message}</Text>
    </BlockStack>
  )
}