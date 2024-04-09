import { Button, Center, Divider, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteType, routes } from "../pages";


export function Navbar(){

    return <>
        <Flex justifyContent='space-around'  width='100%'>
            {
                ...Object.values(routes).map((route : RouteType, index : number) =>
                    <Link to={route.path} key={index}>
                        <Button colorScheme={'teal'} variant={'link'}>
                            {route.name}
                        </Button>
                    </Link>
                )
            }        

        </Flex>
        <Center>
            <Divider m={5} />
        </Center>
    </>
}