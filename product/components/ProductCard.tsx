import React from "react";
import {Stack, Button, Text, Image, Flex} from "@chakra-ui/react";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";


import {parseCurrency} from "../../utils/currency";
import {CartItem} from "../../cart/types";
import {Product} from "../types";
import CartItemDrawer from "../../cart/components/CartItemDrawer";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  const [selectedImage ,setSelectedImage] = React.useState<string>(null);
  const [isModalOpen, toggleModal] = React.useState(false);
  const cartItem = React.useMemo<CartItem>(() => ({...product, quantity: 1}), [product]);

  return (
    <>
 
    <AnimateSharedLayout type="crossfade">
  
      <Stack
        key={product.id}
        alignItems="center"
        borderColor="gray.100"
        borderRadius="md"
        borderWidth={1}
        data-testid="product"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack direction="row" padding={2} spacing={4} width="100%">
          <Image
          as={motion.img}
            backgroundColor="white"
            borderRadius="md"
            cursor="pointer"
            layoutId={product.image}
            height={{base: 24, sm: 36}}
            loading="lazy"
            minWidth={{base: 24, sm: 36}}
            objectFit="contain"
            src={product.image}
            width={{base: 24, sm: 36}}
            onClick={() => setSelectedImage(product.image) }
          />
            <AnimatePresence >
          {selectedImage && <Flex  
          key="backdrop" alignItems="left" 
          as={motion.div} 
          backgroundColor="rgba(0,0,0,0.5)"
          justifyContent="center"
          position="fixed"
          top={0}
          left={0}
          height="100%"
          width="100%"
          onClick={()=> setSelectedImage(null) }
          >

              <Image key="image" src={selectedImage} />
          </Flex> }

      </AnimatePresence>
          <Stack justifyContent="space-between" spacing={1} width="100%">
            <Stack spacing={1}>
              <Text fontWeight="500">{product.title}</Text>
              <Text color="gray.500" fontSize="sm">
                {product.description}
              </Text>
            </Stack>
            <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
              <Text color="brand" fontSize="sm" fontWeight="500">
                {parseCurrency(product.price)}
              </Text>
              <Button
                size="xs"
                onClick={() => (product.options ? toggleModal(true) : onAdd(cartItem))}
              >
                Agregar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isModalOpen && (
        <CartItemDrawer
          isOpen
          item={cartItem}
          onClose={() => toggleModal(false)}
          onSubmit={(item: CartItem) => {
            onAdd(item);
            toggleModal(false);
          }}
        />
      )}
  
  </AnimateSharedLayout>

    </>
      
  );
};

export default ProductCard;
