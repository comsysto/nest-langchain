type ChargingStation = {
  id: string;
  operator: string;
  location: { lat: number; lng: number };
  registrationDate: Date;
  connectors: string[];
};

export const chargingStations: ChargingStation[] = [
  {
    id: "1234",
    operator: "Reply",
    location: { lat: 48.144612, lng: 11.5353759 },
    registrationDate: new Date("2024-03-03T13:51:53.384816Z"),
    connectors: ["Type2", "Type2"],
  },
  {
    id: "5678",
    operator: "Comsysto Reply",
    location: { lat: 48.1787878, lng: 11.5359197 },
    registrationDate: new Date("2024-03-03T13:51:53.384816Z"),
    connectors: ["Type2", "Type2Combo"],
  },
  {
    id: "9012",
    operator: "SWM",
    location: { lat: 48.1787878, lng: 11.5359197 },
    registrationDate: new Date("2024-03-03T13:52:14.573693Z"),
    connectors: ["Type2", "Type2"],
  },
];
