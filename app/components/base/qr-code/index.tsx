'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface QRCodeProps {
    size?: number
    className?: string
}

export default function QRCode({ size = 128, className }: QRCodeProps) {
    const [url, setUrl] = useState('')
    const [providerIndex, setProviderIndex] = useState(0)

    useEffect(() => {
        // window is available client-side
        setUrl(window.location.href)
    }, [])

    const src = useMemo(() => {
        const data = encodeURIComponent(url || '')
        const providers = [
            `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`,
            `https://quickchart.io/qr?text=${data}&size=${size}`,
        ]
        return providers[providerIndex] || providers[0]
    }, [url, size, providerIndex])

    const handleError = useCallback(() => {
        setProviderIndex(prev => (prev + 1) % 2)
    }, [])

    return (
        <div
            className={`inline-flex items-center justify-center bg-white ${className || ''}`}
            style={{ width: size, height: size }}
        >
            {url && (
                <img
                    src={src}
                    alt="QR"
                    width={size}
                    height={size}
                    className="block"
                    onError={handleError}
                />
            )}
        </div>
    )
}


