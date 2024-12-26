export type BlockMeta = {
    tagName: string;
    props: Record<string, unknown>;
};

export type BlockEvents = {
    INIT: string;
    FLOW_CDM: string;
    FLOW_RENDER: string;
    FLOW_CDU: string;
};
