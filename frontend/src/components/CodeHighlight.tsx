import { Code, CodeProps } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { isValidJSON } from "../util";

export type CodeHighlightProps = {
	text: string
} & CodeProps                                          

export function CodeHighlight(props: CodeHighlightProps){
    const parseText = (text : string) => {

        const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
      
        let elements = [];
        let lastIndex = 0;
      

        text.replace(codeBlockPattern, (match, lang, code, offset) => {

            if (offset > lastIndex) {
				elements.push(text.substring(lastIndex, offset));
			}
      
			elements.push(
				<SyntaxHighlighter language={lang} style={materialOceanic} key={`code-${offset}`}>
					{code.trim()}
				</SyntaxHighlighter>
			);
      
			lastIndex = offset + match.length;
			return match;
        });
      
        if (lastIndex < text.length) {
          	elements.push(text.substring(lastIndex));
        }
      
        return elements;
    };

	const elements = parseText(props.text)

	// Special case for json only response without ```json

	if(elements.length == 1 && isValidJSON(elements[0])){
		return <Code {...props}>
			<SyntaxHighlighter language={'json'} style={materialOceanic}>
				{elements[0].trim()}
			</SyntaxHighlighter>
		</Code>
	}

	return <Code {...props}>
		{...elements.map((a, i) => <div key={i}>{a}</div>)}
	</Code>
}