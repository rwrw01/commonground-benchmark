export type Initiative = {
  id: string;
  name: string;
  category: string;
};

export const CATEGORIES = [
  "Zaaksystemen",
  "Portalen & MijnOmgeving",
  "Registers & Data",
  "Documenten & Archief",
  "Notificaties & Communicatie",
  "Formulieren & Klantinteractie",
  "Geo & Visualisatie",
  "AI & Innovatie",
  "Overig",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const initiatives: Initiative[] = [
  // Zaaksystemen
  { id: "open-zaak", name: "Open Zaak", category: "Zaaksystemen" },
  { id: "gzac", name: "GZAC", category: "Zaaksystemen" },
  { id: "zakenregister", name: "Zakenregister", category: "Zaaksystemen" },
  { id: "xxllnc-zaken", name: "xxllnc Zaken", category: "Zaaksystemen" },
  { id: "aansluiting-join", name: "Aansluiting JOIN Zaaksysteem (Decos) op de MijnOmgeving van OWC gemeenten", category: "Zaaksystemen" },
  { id: "koppelen-join", name: "koppelen Zaaksysteem JOIN (Decos) met OpenWebConcept formulieren", category: "Zaaksystemen" },
  { id: "open-zaakbrug", name: "Open Zaakbrug", category: "Zaaksystemen" },

  // Portalen & MijnOmgeving
  { id: "open-inwoner-platform", name: "Open Inwoner Platform (OIP)", category: "Portalen & MijnOmgeving" },
  { id: "nlportal", name: "NLPortal MijnOmgeving voor inwoners en ondernemers", category: "Portalen & MijnOmgeving" },
  { id: "open-webconcept", name: "Open Webconcept", category: "Portalen & MijnOmgeving" },
  { id: "mijnomgeving-as-a-service", name: "MijnOmgeving-as-a-service", category: "Portalen & MijnOmgeving" },
  { id: "centric-leefomgeving", name: "Centric Leefomgeving", category: "Portalen & MijnOmgeving" },

  // Registers & Data
  { id: "open-registers", name: "Open Registers", category: "Registers & Data" },
  { id: "brkregister", name: "BRKRegister", category: "Registers & Data" },
  { id: "referentielijsten-api", name: "Referentielijsten API", category: "Registers & Data" },
  { id: "opencatalogi", name: "OpenCatalogi", category: "Registers & Data" },
  { id: "open-index", name: "Open Index", category: "Registers & Data" },
  { id: "datavirtualisatie", name: "Datavirtualisatie", category: "Registers & Data" },
  { id: "gemeenschappelijke-datacatalogus", name: "Gemeenschappelijke DataCatalogus (GDC)", category: "Registers & Data" },
  { id: "oneground", name: "OneGround", category: "Registers & Data" },
  { id: "open-producten", name: "Open Producten", category: "Registers & Data" },
  { id: "vrijbrp", name: "vrijBRP (open source BRP voor gemeenten)", category: "Registers & Data" },
  { id: "osano-registersysteem", name: "Osano Registersysteem", category: "Registers & Data" },
  { id: "verwerkinglogging", name: "Verwerkinglogging implementatie", category: "Registers & Data" },

  // Documenten & Archief
  { id: "alfresco-documenten-api", name: "Alfresco Documenten API", category: "Documenten & Archief" },
  { id: "open-archiefbeheer", name: "Open Archiefbeheer", category: "Documenten & Archief" },
  { id: "archiefbeheer", name: "Archiefbeheer", category: "Documenten & Archief" },
  { id: "archivering-vernietiging", name: "Archivering en Vernietigings Component", category: "Documenten & Archief" },
  { id: "xential", name: "Xential", category: "Documenten & Archief" },
  { id: "waardepapieren", name: "Waardepapieren", category: "Documenten & Archief" },
  { id: "divault-flex", name: "DiVault FLEX (pre-depot)", category: "Documenten & Archief" },

  // Notificaties & Communicatie
  { id: "notifynl-omc", name: "NotifyNL en OMC", category: "Notificaties & Communicatie" },
  { id: "open-notificaties", name: "Open Notificaties", category: "Notificaties & Communicatie" },
  { id: "signalen", name: "Signalen", category: "Notificaties & Communicatie" },
  { id: "samen-delen", name: "Samen delen", category: "Notificaties & Communicatie" },

  // Formulieren & Klantinteractie
  { id: "open-formulieren", name: "Open Formulieren", category: "Formulieren & Klantinteractie" },
  { id: "open-klant", name: "Open Klant", category: "Formulieren & Klantinteractie" },
  { id: "kiss", name: "KISS, KlantinteractieServicesysteem", category: "Formulieren & Klantinteractie" },
  { id: "openinschrijving", name: "OPENinschrijving", category: "Formulieren & Klantinteractie" },
  { id: "digitaal-ondertekenen", name: "digitaal ondertekenen", category: "Formulieren & Klantinteractie" },
  { id: "geval", name: "Geval (Generieke Validaties)", category: "Formulieren & Klantinteractie" },

  // Geo & Visualisatie
  { id: "mapgallery", name: "MapGallery", category: "Geo & Visualisatie" },
  { id: "openstad", name: "OpenStad", category: "Geo & Visualisatie" },
  { id: "digitale-tweeling", name: "Digitale Tweeling Nederland Platform | Analyze, Alkmaar en (Stichting i.o.) Digitale Tweeling Nederland", category: "Geo & Visualisatie" },
  { id: "digitale-terinzagelegging", name: "Digitale terinzagelegging", category: "Geo & Visualisatie" },

  // AI & Innovatie
  { id: "safegpt", name: "SafeGPT", category: "AI & Innovatie" },
  { id: "digitale-medewerker", name: "Digitale Medewerker 'Chatbot MAI'", category: "AI & Innovatie" },
  { id: "octopus", name: "Octopus", category: "AI & Innovatie" },

  // Overig
  { id: "openservices", name: "OpenServices", category: "Overig" },
  { id: "openwoo", name: "OpenWoo.app", category: "Overig" },
  { id: "rx-open", name: "Rx.Open", category: "Overig" },
  { id: "rx-mission", name: "Rx.Mission", category: "Overig" },
  { id: "tezza", name: "Tezza", category: "Overig" },
  { id: "werkplek-reservering", name: "Werkplek reservering", category: "Overig" },
  { id: "myfms", name: "MyFMS", category: "Overig" },
  { id: "isynaps", name: "iSyNAPS", category: "Overig" },
  { id: "djuma-dna", name: "Djuma DnA", category: "Overig" },
  { id: "gem", name: "GEM", category: "Overig" },
  { id: "ase-cloud-services", name: "ASE Cloud Services", category: "Overig" },
  { id: "atlas", name: "Atlas", category: "Overig" },
  { id: "vergunning-controle", name: "Vergunning Controle Service (VCS)", category: "Overig" },
];
