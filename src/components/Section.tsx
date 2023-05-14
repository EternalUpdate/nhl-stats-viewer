import { Text } from "@chakra-ui/react";

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
                mt={{ base: "16", md: "24" }}
                mb={{ base: "1" }}
            >
                {title}
            </Text>
            {children}
        </>
    );
}
