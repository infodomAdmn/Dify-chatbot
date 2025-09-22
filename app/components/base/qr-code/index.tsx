'use client'

import React, { useEffect, useMemo, useState } from 'react'

interface QRCodeProps {
    size?: number
    className?: string
}

export default function QRCode({ size = 128, className }: QRCodeProps) {
    const [url, setUrl] = useState('')

    useEffect(() => {
        // window is available client-side
        setUrl(window.location.href)
    }, [])

    const src = useMemo(() => {
        const data = encodeURIComponent(url || '')
        // Using a lightweight external QR API to avoid extra deps
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`
    }, [url, size])

    if (!url)
        return null

    return (
        <img
            src={src}
            alt="QR"
            width={size}
            height={size}
            className={className}
        />
    )
}


