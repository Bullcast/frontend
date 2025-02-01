import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                primary: {
                    DEFAULT: {
                        value: "#29EC97"
                    },
                    1: {
                        value: "#02120B"
                    },
                    2: {
                        value: "#02130C"
                    },
                    3: {
                        value: "#053A23"
                    },
                    4: {
                        value: "#09613B"
                    },
                    5: {
                        value: "#0C8852"
                    },
                    6: {
                        value: "#10AF6A"
                    },
                    7: {
                        value: "#13D682"
                    },
                    8: {
                        value: "#29EC97"
                    },
                    9: {
                        value: "#50EFAA"
                    },
                    10: {
                        value: "#9EF6D0"
                    },
                    11: {
                        value: "#C5FAE3"
                    },
                    12: {
                        value: "#EBFDF6"
                    }
                }
            }
        },
    }
});

export default createSystem(config, defaultConfig);