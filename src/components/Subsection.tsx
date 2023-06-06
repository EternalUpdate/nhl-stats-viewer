import { Text, Box } from "@chakra-ui/react";

interface SubsectionProps {
    title?: string;
    children: any;
}

export function Subsection({ title, children }: SubsectionProps) {
    return (
        <>
            <Box>
                {title && (
                    <Text
                        fontSize={{ base: "xl", md: "2xl" }}
                        textAlign="left"
                        mt={{ base: "2", md: "6" }}
                        mb={{ base: "2", md: "6" }}
                    >
                        {title}
                    </Text>
                )}
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
            </Box>
        </>
    );
}
