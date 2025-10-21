
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { mockProperties } from '@/lib/mockData';

export function useMockProperties() {
    const { address } = useAccount();
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call delay
        const timer = setTimeout(() => {
            if (address) {
                // Filter properties owned by current user
                const userProperties = mockProperties.filter(
                    property => property.owner.toLowerCase() === address.toLowerCase()
                );
                setProperties(userProperties);
            } else {
                setProperties([]);
            }
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [address]);

    return {
        properties,
        loading,
        totalCount: properties.length
    };
}