import { PromptingTemplate } from "../components";

export type RouteType = {
  name: string;
  path: string;
  component: JSX.Element;
};

export const routes: RouteType[] = [
  {
    name: "Simple Prompt",
    path: "/demo-simple-prompt",
    component: (
      <PromptingTemplate
        apiPath={(prompt) => `/chat?prompt=${prompt}`}
        heading="Simple interactive AI Prompt Responses"
        description="Engage with an intelligent AI that interprets and responds to a variety of prompts. Enter any phrase and be amazed at the spot-on responses generated by cutting-edge language processing technologies."
        textAreaPlaceholder="Enter a prompt..."
        key="demo1"
      />
    ),
  },
  {
    name: "Incorrectly formatted address",
    path: "/demo-incorrectly-formatted-address",
    component: (
      <PromptingTemplate
        apiPath={(prompt) => `/format-address?address=${prompt}`}
        heading="Address formatting"
        description="Effortlessly reorganize jumbled addresses into a standardized format. Input an address in any configuration, and the AI outputs it correctly formatted, ensuring clarity and uniformity every time."
        textAreaPlaceholder="Enter an address in any format..."
        key="demo2"
      />
    ),
  },
  {
    name: "Missing zip code",
    path: "/demo-missing-zip-code",
    component: (
      <PromptingTemplate
        apiPath={(prompt) => `/format-address-with-tools?address=${prompt}`}
        heading="Address formatting with zip completion"
        description="Enhancing the capabilities of traditional address formatting, this AI not only rearranges address details but also actively retrieves missing zip codes. It's an intuitive tool that enriches your data for a complete address profile."
        textAreaPlaceholder="Enter an address without zipcode..."
        key="demo3"
      />
    ),
  },
  {
    name: "Nearby charging stations",
    path: "/demo-nearby-stations",
    component: (
      <PromptingTemplate
        apiPath={(prompt) => `/charging-station-query?query=${prompt}`}
        heading="Intelligent Search for Charging Stations"
        description="Find the ideal spot to recharge both your vehicle and yourself. An intelligent search capability applies advanced semantic understanding to sift through various criteria, returning specific results tailored to your needs. Input a location query along with personal preferences, and let the power of AI reveal the best options for your next stop."
        textAreaPlaceholder="Enter a semantic charging station..."
        key="demo4"
      />
    ),
  },
];
