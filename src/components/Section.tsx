import { Text, Box } from "@chakra-ui/react";

interface SectionProps {
    title: string;
    children: any;
    mtBase?: string;
    mtMd?: string;
}

export function Section({ title, children, mtBase, mtMd }: SectionProps) {
    return (
        <>
            <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="left"
                mt={{ base: mtBase ? mtBase : "14", md: mtMd ? mtMd : "28" }}
                mb={{ base: "2", md: "6" }}
            >
                {title}
            </Text>
            <Box
                display={{ base: "block", md: "flex" }}
                flexGrow="1"
                flexDirection="row"
                flexWrap="wrap"
                gap="70px"
                justifyContent="space-evenly"
                alignContent="center"
            >
                {children}
            </Box>
        </>
    );
}
