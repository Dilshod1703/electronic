import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Spinner,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, cart]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({ description: 'Item has been added.', status: 'success', isClosable: true });
  };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex='1.5'
                mb={{ base: '12', md: 'none' }}
              >
                {product.productIsNew && (
                  <Badge rounded='full' w='40px' fontSize='0.8em' colorScheme='green'>
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
                    Sold out
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='semibold'>
                  {product.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='xl'>${product.price}</Text>
                    <Flex>
                      <HStack spacing={'2px'}>
                        <StarIcon color='orange.500' />
                        <StarIcon color={product.rating >= 2 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={product.rating >= 3 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={product.rating >= 4 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={product.rating >= 5 ? 'orange.500' : 'gray.200'} />
                      </HStack>
                      <Text fontSize='medium' fontWeight='semibold' ml='4px'>
                        {product.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight={'semibold'}>Quantity</Text>
                  <Flex width={'170px'} padding='5px' border='1px' borderColor={'gray.200'} alignItems='center'>
                    <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
                      <MinusIcon />
                    </Button>
                    <Text mx='30px'>{amount}</Text>
                    <Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
                      <SmallAddIcon width={'20px'} height='25px' />
                    </Button>
                  </Flex>
                  <Button isDisabled={product.stock === 0} colorScheme='blue' onClick={() => addItem()}>
                    Add to cart
                  </Button>
                  <Stack width={'270px'}>
                    <Flex alignItems={'center'}>
                      <BiPackage size='20px' />
                      <Text fontWeight={'medium'} fontSize='small' marginLeft='2'>
                        Free sheeping is guaranteed if order is above 1000$
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <BiCheckShield size='20px' />
                      <Text fontWeight={'medium'} fontSize='small' ml='2'>
                        2 year extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <BiSupport size='20px' />
                      <Text fontWeight={'medium'} fontSize='small' ml='2'>
                        Shop operates 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction={'column'} align='center' flex='1' _dark={{ bg: 'grey.900' }}>
                <Image marginBottom='30px' src={product.image} alt={product.name} />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize={'xl'} fontWeight='bold'>
                Reviews
              </Text>
              <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems='center'>
                      <StarIcon color='orange.500' />
                      <StarIcon color={review.rating >= 2 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 3 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 4 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 5 ? 'orange.500' : 'gray.200'} />
                      <Text fontWeight='semibold' ml='4px'>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box paddingY='12px'>{review.comment}</Box>
                    <Text fontSize='small' color='gray.400'>
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
