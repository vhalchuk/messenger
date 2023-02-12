import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

export const theme = extendTheme(
    { config },
    {
        colors: {
            brand: {
                100: "#3D84F7",
                200: '#306dd7'
            },
        },
        styles: {
            global: () => ({
                body: {
                    bg: "whiteAlpha.200",
                },
            }),
        },
    }
);
