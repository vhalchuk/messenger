import {type FC} from 'react';
import { Skeleton } from "@chakra-ui/react";

type SkeletonLoaderProps = {
    count: number;
    height: string;
    width: string;
}

export const Skeletons: FC<SkeletonLoaderProps> = (
    {
        count,
        height,
        width,
    }
) => {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <Skeleton
                    key={i}
                    startColor="blackAlpha.400"
                    endColor="whiteAlpha.300"
                    height={height}
                    width={width}
                    borderRadius={4}
                />
            ))}
        </>
    );
};
