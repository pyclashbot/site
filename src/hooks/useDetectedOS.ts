import { useState, useEffect } from 'react'

export type DetectedOS = 'windows' | 'macos' | 'unknown'

export function useDetectedOS(): DetectedOS {
  const [os, setOS] = useState<DetectedOS>('unknown')

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('mac')) {
      setOS('macos')
    } else if (ua.includes('win')) {
      setOS('windows')
    }
  }, [])

  return os
}

export function getAssetPlatform(
  name: string
): 'windows' | 'macos' | 'unknown' {
  if (name.includes('win64')) return 'windows'
  if (name.includes('macos')) return 'macos'
  return 'unknown'
}
