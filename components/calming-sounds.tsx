"use client"

import { useState, useRef, useEffect } from "react"
import { X, Music, Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CalmingSoundsProps {
  onClose: () => void
}

const sounds = [
  { id: 1, name: "Ocean Waves", emoji: "🌊", duration: "10:00", type: "ocean" },
  { id: 2, name: "Rain on Window", emoji: "🌧️", duration: "15:00", type: "rain" },
  { id: 3, name: "Forest Birds", emoji: "🐦", duration: "12:00", type: "birds" },
  { id: 4, name: "Crackling Fire", emoji: "🔥", duration: "20:00", type: "fire" },
  { id: 5, name: "Gentle Stream", emoji: "💧", duration: "18:00", type: "stream" },
  { id: 6, name: "Wind Chimes", emoji: "🎐", duration: "8:00", type: "chimes" },
  { id: 7, name: "Thunderstorm", emoji: "⛈️", duration: "25:00", type: "thunder" },
  { id: 8, name: "White Noise", emoji: "📻", duration: "30:00", type: "whitenoise" },
  { id: 9, name: "Cat Purring", emoji: "🐱", duration: "10:00", type: "purr" },
  { id: 10, name: "Piano Melody", emoji: "🎹", duration: "15:00", type: "piano" },
  { id: 11, name: "Tibetan Bowls", emoji: "🔔", duration: "12:00", type: "bowls" },
  { id: 12, name: "Night Crickets", emoji: "🦗", duration: "20:00", type: "crickets" },
  { id: 13, name: "Waterfall", emoji: "🏞️", duration: "18:00", type: "waterfall" },
  { id: 14, name: "Soft Wind", emoji: "🍃", duration: "15:00", type: "wind" },
  { id: 15, name: "Meditation Bells", emoji: "🧘", duration: "10:00", type: "bells" },
]

export function CalmingSounds({ onClose }: CalmingSoundsProps) {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<(OscillatorNode | AudioBufferSourceNode)[]>([])
  const gainNodeRef = useRef<GainNode | null>(null)

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioInitialized(true)
    }
  }

  useEffect(() => {
    return () => {
      stopAllSounds()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const stopAllSounds = () => {
    nodesRef.current.forEach((node) => {
      try {
        node.stop()
      } catch (e) {
        // Node might already be stopped
      }
    })
    nodesRef.current = []
  }

  const createSound = (type: string) => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const gainNode = audioContext.createGain()
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1)
    gainNode.connect(audioContext.destination)
    gainNodeRef.current = gainNode

    const nodes: (OscillatorNode | AudioBufferSourceNode)[] = []

    switch (type) {
      case "ocean":
      case "rain":
      case "waterfall":
      case "stream":
        // White noise for water sounds
        const bufferSize = audioContext.sampleRate * 2
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1
        }
        const whiteNoise = audioContext.createBufferSource()
        whiteNoise.buffer = buffer
        whiteNoise.loop = true

        const filter = audioContext.createBiquadFilter()
        filter.type = type === "ocean" ? "lowpass" : "bandpass"
        filter.frequency.value = type === "ocean" ? 400 : type === "rain" ? 1000 : 800

        whiteNoise.connect(filter)
        filter.connect(gainNode)
        whiteNoise.start()
        nodes.push(whiteNoise)
        break

      case "wind":
      case "whitenoise":
        // Pure white noise
        const noiseBufferSize = audioContext.sampleRate * 2
        const noiseBuffer = audioContext.createBuffer(1, noiseBufferSize, audioContext.sampleRate)
        const noiseData = noiseBuffer.getChannelData(0)
        for (let i = 0; i < noiseBufferSize; i++) {
          noiseData[i] = Math.random() * 2 - 1
        }
        const noise = audioContext.createBufferSource()
        noise.buffer = noiseBuffer
        noise.loop = true
        noise.connect(gainNode)
        noise.start()
        nodes.push(noise)
        break

      case "fire":
      case "thunder":
        // Crackling/rumbling with filtered noise
        const crackleSize = audioContext.sampleRate * 2
        const crackleBuffer = audioContext.createBuffer(1, crackleSize, audioContext.sampleRate)
        const crackleData = crackleBuffer.getChannelData(0)
        for (let i = 0; i < crackleSize; i++) {
          crackleData[i] = Math.random() * 2 - 1
        }
        const crackle = audioContext.createBufferSource()
        crackle.buffer = crackleBuffer
        crackle.loop = true

        const crackleFilter = audioContext.createBiquadFilter()
        crackleFilter.type = "lowpass"
        crackleFilter.frequency.value = type === "fire" ? 600 : 200

        crackle.connect(crackleFilter)
        crackleFilter.connect(gainNode)
        crackle.start()
        nodes.push(crackle)
        break

      case "birds":
      case "crickets":
        // High frequency oscillations
        for (let i = 0; i < 3; i++) {
          const osc = audioContext.createOscillator()
          osc.type = "sine"
          osc.frequency.value = type === "birds" ? 2000 + Math.random() * 1000 : 3000 + Math.random() * 2000

          const oscGain = audioContext.createGain()
          oscGain.gain.value = 0.1

          // Add tremolo effect
          const lfo = audioContext.createOscillator()
          lfo.frequency.value = 0.5 + Math.random() * 2
          const lfoGain = audioContext.createGain()
          lfoGain.gain.value = 0.05

          lfo.connect(lfoGain)
          lfoGain.connect(oscGain.gain)

          osc.connect(oscGain)
          oscGain.connect(gainNode)

          osc.start()
          lfo.start()
          nodes.push(osc, lfo)
        }
        break

      case "purr":
        // Low frequency rumble
        const purr = audioContext.createOscillator()
        purr.type = "sawtooth"
        purr.frequency.value = 25

        const purrGain = audioContext.createGain()
        purrGain.gain.value = 0.3

        purr.connect(purrGain)
        purrGain.connect(gainNode)
        purr.start()
        nodes.push(purr)
        break

      case "piano":
      case "chimes":
      case "bowls":
      case "bells":
        // Harmonic tones
        const frequencies = type === "piano" ? [261.63, 329.63, 392.0] : [432, 528, 639]
        frequencies.forEach((freq) => {
          const osc = audioContext.createOscillator()
          osc.type = "sine"
          osc.frequency.value = freq

          const oscGain = audioContext.createGain()
          oscGain.gain.value = 0.15

          osc.connect(oscGain)
          oscGain.connect(gainNode)
          osc.start()
          nodes.push(osc)
        })
        break

      default:
        // Default gentle tone
        const defaultOsc = audioContext.createOscillator()
        defaultOsc.type = "sine"
        defaultOsc.frequency.value = 432
        defaultOsc.connect(gainNode)
        defaultOsc.start()
        nodes.push(defaultOsc)
    }

    nodesRef.current = nodes
  }

  const togglePlay = (id: number) => {
    // Initialize audio on first interaction
    if (!audioInitialized) {
      initAudio()
    }

    if (playingId === id) {
      // Stop current sound
      stopAllSounds()
      setPlayingId(null)
    } else {
      // Stop previous sound if any
      stopAllSounds()

      // Start new sound
      const sound = sounds.find((s) => s.id === id)
      if (sound) {
        createSound(sound.type)
      }

      setPlayingId(id)
    }
  }

  const handleClose = () => {
    stopAllSounds()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl my-8">
        <Card className="p-6 md:p-8 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-purple-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Calming Sounds</h2>
            <p className="text-muted-foreground">Choose a soothing sound to help you relax and focus</p>
          </div>

          {/* Sounds Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {sounds.map((sound) => (
              <Card
                key={sound.id}
                className={`p-4 hover:border-primary/50 transition-all cursor-pointer ${
                  playingId === sound.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => togglePlay(sound.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{sound.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-0.5 truncate">{sound.name}</h4>
                    <p className="text-xs text-muted-foreground">{sound.duration}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {playingId === sound.id ? (
                      <Pause className="w-5 h-5 text-primary" />
                    ) : (
                      <Play className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Volume indicator */}
          {playingId && (
            <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Volume2 className="w-5 h-5 text-primary" />
                <span>
                  Now playing: <strong>{sounds.find((s) => s.id === playingId)?.name}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Back button */}
          <Button onClick={handleClose} className="w-full" size="lg">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    </div>
  )
}
