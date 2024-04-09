import { Button, Center, Divider, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteType, routes } from "../pages";


export function Navbar(){

    return <>
        <Flex justifyContent='space-evenly'  width='100vw'>
            {
                ...Object.values(routes).map((route : RouteType, index : number) =>
                    <Link to={route.path} key={index}>
                        <Button colorScheme={'teal'} variant={'link'}>
                            {route.name}
                        </Button>
                    </Link>
                )
            }
            {/* <Box>
                b1
            </Box>
            <Button colorScheme='teal' variant='link'>
                Button
            </Button>
            <Box>
                b1
            </Box>
            <Box>
                b1
            </Box> */}
        </Flex>
        <Center height='30px'>
            <Divider orientation='horizontal' />
        </Center>
    </>
}