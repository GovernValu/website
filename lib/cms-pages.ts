// Content pages editable in the admin portal (Services has its own section).

export interface CmsPage {
    id: string;
    name: string;
    description: string;
    /** Public URL to preview, when the page has one. */
    previewPath?: string;
}

export const CMS_PAGES: CmsPage[] = [
    { id: "homepage", name: "Homepage", description: "Hero, metrics, expertise and contact sections", previewPath: "/" },
    { id: "chairman", name: "About - Chairman's Message", description: "Chairman's welcome message and vision", previewPath: "/about/chairman" },
    { id: "about", name: "About - Who We Are", description: "Company introduction and overview", previewPath: "/about" },
    { id: "strategic-concept", name: "About - Strategic Concept", description: "Concept, vision, mission, values and objectives", previewPath: "/about/strategic-concept" },
    { id: "board", name: "About - Board of Directors", description: "Board members and leadership", previewPath: "/about/board" },
    { id: "philosophy", name: "About - Philosophy", description: "Guiding principles and approach", previewPath: "/about/philosophy" },
    { id: "expertise", name: "About - Expertise", description: "Areas of expertise and client types", previewPath: "/about/expertise" },
    { id: "teams", name: "About - Teams", description: "Teams and their focus areas", previewPath: "/about/teams" },
    { id: "clients", name: "Clients", description: "Client logos with English and Arabic details", previewPath: "/clients" },
    { id: "partners", name: "Partnerships", description: "Strategic partners and alliances", previewPath: "/partners" },
    { id: "industries", name: "Industries", description: "Sectors served and industry pages", previewPath: "/industries" },
    { id: "news", name: "News", description: "Company news and updates", previewPath: "/news" },
    { id: "contact", name: "Contact", description: "Contact form, offices and FAQ", previewPath: "/contact" },
    { id: "settings", name: "Site Settings", description: "Company info, social links and footer" },
];

export const getCmsPage = (id: string) => CMS_PAGES.find((page) => page.id === id);
