import { Document } from "@langchain/core/documents";

export const commentDocuments: Document[] = [
  {
    pageContent: "Everything was great. There is even a playground nearby",
    metadata: { chargingStationId: "1234", id: "1" },
  },
  {
    pageContent: "I always charge my car here. My children like to play at the playground next to it.",
    metadata: { chargingStationId: "1234", id: "2" },
  },
  {
    pageContent: "Works as expected",
    metadata: { chargingStationId: "1234", id: "3" },
  },
  {
    pageContent: "There is a restaurant close to it",
    metadata: { chargingStationId: "9012", id: "4" },
  },
  {
    pageContent: "The charging station never works. I have been here several times.",
    metadata: { chargingStationId: "5678", id: "5" },
  },
  {
    pageContent: "Great station. I spent the time eating a burger on the other side of the street.",
    metadata: { chargingStationId: "9012", id: "6" },
  },
  { pageContent: "Great cafe close to it.", metadata: { chargingStationId: "9012", id: "7" } },
  { pageContent: "something else", metadata: { chargingStationId: "1234", id: "8" } },
  { pageContent: "unrelated comment", metadata: { chargingStationId: "1234", id: "9" } },
  { pageContent: "nothing special", metadata: { chargingStationId: "1234", id: "10" } },
  { pageContent: "unrelated comment", metadata: { chargingStationId: "1234", id: "11" } },
  { pageContent: "something else", metadata: { chargingStationId: "1234", id: "12" } },
  { pageContent: "good charging station", metadata: { chargingStationId: "1234", id: "13" } },
  { pageContent: "something else", metadata: { chargingStationId: "5678", id: "14" } },
  { pageContent: "unrelated comment", metadata: { chargingStationId: "5678", id: "15" } },
  { pageContent: "nothing special", metadata: { chargingStationId: "5678", id: "16" } },
  { pageContent: "unrelated comment", metadata: { chargingStationId: "5678", id: "17" } },
  { pageContent: "something else", metadata: { chargingStationId: "5678", id: "18" } },
  { pageContent: "good charging station", metadata: { chargingStationId: "5678", id: "19" } },
  { pageContent: "something else", metadata: { chargingStationId: "9012", id: "20" } },
  { pageContent: "unrelated comment", metadata: { chargingStationId: "9012", id: "21" } },
  { pageContent: "nothing special", metadata: { chargingStationId: "9012", id: "22" } },
  { pageContent: "unrelated comment", metadata: { chargingStationId: "9012", id: "23" } },
  { pageContent: "something else", metadata: { chargingStationId: "9012", id: "24" } },
  { pageContent: "good charging station", metadata: { chargingStationId: "9012", id: "25" } },
];
