"use client"

import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  initialTime: number // in seconds
  onTimeExpired?: () => void
}

export function Timer({ initialTime, onTimeExpired }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(true)
  // Guards against notifying `onTimeExpired` more than once (e.g. StrictMode
  // double-invoked updates or re-runs of this effect after expiry).
  const hasExpiredRef = useRef(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const notifyTimeExpired = () => {
      if (hasExpiredRef.current) {
        return
      }
      hasExpiredRef.current = true
      if (onTimeExpired) {
        onTimeExpired()
      }
    }

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1
          if (newTime <= 0) {
            // Expiry is handled here, inside the interval callback, instead of
            // synchronously in the effect body.
            setIsRunning(false)
            notifyTimeExpired()
          }
          return newTime
        })
      }, 1000)
    } else if (timeRemaining === 0) {
      // Timer started with no time left: notify without stopping state here.
      notifyTimeExpired()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, onTimeExpired])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium w-full">
      <div className="h-full w-[20%] flex justify-center items-center">
        <Clock className="h-4 w-4" />
      </div>
      <div className="h-full w-[4rem] flex justify-center items-center">
        <span className={`${timeRemaining < 300 ? "text-red-500" : ""}`}>{formatTime(timeRemaining)}</span>
      </div>
    </div>
  )
}
