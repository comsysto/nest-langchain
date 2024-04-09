import { Button, Code, Divider, Heading, SkeletonText, Stack, Text, Textarea } from "@chakra-ui/react";
import {ChatIcon} from '@chakra-ui/icons'
import { useState } from "react";
import { api } from "../api/apiService";

import { CodeHighlight } from "../components";



export type PromptingTemplateProps = {
    apiPath: (prompt: string) => string,
    heading: string,
    description: string,
    textAreaPlaceholder: string,
    key: string,

}

export function PromptingTemplate({apiPath, heading, description, textAreaPlaceholder, key} : PromptingTemplateProps) {

    const [response, setResponse] = useState('')
    const [fetching, setFetching] = useState(false)
    const [prompt, setPrompt] = useState('')

    const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value)
    }

    const handleFetch = async () => {
        setFetching(true)
        const [res, err] = await api.fetch(`${apiPath(prompt)}`)

        if(err){
            // ...
        }

        setFetching(false)
        setResponse(res as string)
    }

    return <>
        <Stack spacing={3}>
            <Heading overflow={'hidden'} size={'lg'}>{heading}</Heading>
            <Text>{description}</Text>
        </Stack>

        <Stack key={key} direction={'row'} justifyContent={"center"} padding={5}>
            <Stack padding={1} width={'40%'} minWidth={'200px'} maxWidth={'1200px'} >
                <Textarea minHeight='120px' placeholder={textAreaPlaceholder} size="lg" resize={'none'} onChange={handleChange} />
                <Stack justifyContent={'flex-end'} direction={'row'}>
                    <Button width={'100%'} onClick={handleFetch} rightIcon={<ChatIcon />} colorScheme="teal">Send</Button>
                </Stack>
            </Stack>
            <Stack>
                <Divider orientation="vertical" />
            </Stack>
            <Stack width={'40%'} minWidth={'200px'} maxWidth={'1200px'}>
                {
                    fetching ? (
                        <Code padding={3}>
                            <SkeletonText mt='0' noOfLines={4} spacing='4' skeletonHeight='3' />
                        </Code>
                    ) : (
                        response ? (
                            <CodeHighlight text={response} padding={3} whiteSpace={'pre-wrap'} textAlign={'left'} />
                        ) : (
                            <></>
                        )
                    )
                }
                
            </Stack>
        </Stack>

    </>
}