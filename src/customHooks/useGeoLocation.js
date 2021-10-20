import { useEffect, useState } from 'react';

export default function useGeoLocation(options) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState({});

    useEffect(() => {
        const onSuccess = e => {
            setLoading(false);
            setError(null);
            setData(e.coords);
        }
        const onError = e => {
            setError(e.message);
            setLoading(false);
        }
        navigator.geolocation.getCurrentPosition(
            onSuccess,
            onError,
            options
        )
        const id = navigator.geolocation.watchPosition(
            onSuccess,
            onError,
            options
        )
        return () => navigator.geolocation.clearWatch(id);
    }, [options]);

    return { loading, error, data };
}