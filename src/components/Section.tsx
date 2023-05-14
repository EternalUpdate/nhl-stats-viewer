import { Text, Box } from "@chakra-ui/react";

interface SectionProps {
    title: string;
    children: any;
}

export function Section({ title, children }: SectionProps) {
    return (
        <>
            <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="left"
                mt={{ base: "14", md: "14" }}
                mb={{ base: "1" }}
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
