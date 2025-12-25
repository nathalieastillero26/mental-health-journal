"use client"

import { useState, useEffect } from "react"
import { X, Coffee, Book, Footprints, Sun, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TakeABreakProps {
  onClose: () => void
}

type ActivityType = "warm-drink" | "walk" | "quotes" | "stretch" | null

const breakActivities = [
  {
    id: "warm-drink" as ActivityType,
    icon: Coffee,
    title: "Make a Drink",
    description: "Step-by-step recipes for warm and cold drinks",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    id: "walk" as ActivityType,
    icon: Footprints,
    title: "Take a Short Walk",
    description: "5-10 minute walking timer",
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "quotes" as ActivityType,
    icon: Book,
    title: "Read Something Light",
    description: "Motivational quotes to inspire you",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "stretch" as ActivityType,
    icon: Sun,
    title: "Stretch Your Body",
    description: "10 basic stretching exercises",
    color: "bg-orange-500/10 text-orange-500",
  },
]

const drinkRecipes = {
  warm: [
    {
      name: "Calming Chamomile Tea",
      ingredients: ["1 chamomile tea bag", "1 cup hot water", "1 tsp honey (optional)", "Lemon slice (optional)"],
      procedure: [
        "Boil water and let it cool for 30 seconds",
        "Place tea bag in your favorite mug",
        "Pour hot water over the tea bag",
        "Steep for 5 minutes",
        "Remove tea bag and add honey if desired",
        "Add a lemon slice for extra flavor",
        "Sip slowly and enjoy the warmth",
      ],
    },
    {
      name: "Soothing Hot Chocolate",
      ingredients: [
        "2 tbsp cocoa powder",
        "1 tbsp sugar",
        "1 cup milk",
        "1/4 tsp vanilla extract",
        "Pinch of cinnamon",
      ],
      procedure: [
        "Mix cocoa powder and sugar in a mug",
        "Add 2 tbsp of milk and stir into a paste",
        "Heat remaining milk until steaming (not boiling)",
        "Pour hot milk into the mug while stirring",
        "Add vanilla extract and cinnamon",
        "Stir well until smooth",
        "Top with marshmallows if desired",
      ],
    },
  ],
  cold: [
    {
      name: "Refreshing Iced Lemon Water",
      ingredients: ["1 lemon", "2 cups cold water", "Ice cubes", "1 tsp honey (optional)", "Fresh mint leaves"],
      procedure: [
        "Squeeze juice from one lemon",
        "Fill a glass with ice cubes",
        "Pour cold water over ice",
        "Add lemon juice and stir",
        "Add honey if you prefer sweetness",
        "Garnish with fresh mint leaves",
        "Enjoy the refreshing taste",
      ],
    },
    {
      name: "Berry Smoothie",
      ingredients: ["1 cup mixed berries", "1 banana", "1/2 cup yogurt", "1/2 cup milk", "1 tsp honey", "Ice cubes"],
      procedure: [
        "Add berries and banana to blender",
        "Pour in yogurt and milk",
        "Add honey and a handful of ice",
        "Blend on high for 30-45 seconds",
        "Check consistency and blend more if needed",
        "Pour into a glass",
        "Enjoy your nutritious smoothie",
      ],
    },
  ],
}

const motivationalQuotes = {
  love: [
    "Love yourself first and everything else falls into line.",
    "The greatest thing you'll ever learn is to love and be loved in return.",
  ],
  life: [
    "Life is 10% what happens to you and 90% how you react to it.",
    "The purpose of life is to live it, to taste experience to the utmost.",
  ],
  school: [
    "Education is the most powerful weapon which you can use to change the world.",
    "The beautiful thing about learning is that no one can take it away from you.",
  ],
  career: [
    "Choose a job you love, and you will never have to work a day in your life.",
    "Success is not the key to happiness. Happiness is the key to success.",
  ],
  faith: [
    "Faith is taking the first step even when you don't see the whole staircase.",
    "Let your faith be bigger than your fear.",
  ],
}

const stretchingExercises = [
  {
    name: "Neck Rolls",
    instructions:
      "Slowly roll your head in a circular motion, 5 times clockwise, then 5 times counterclockwise. Keep your shoulders relaxed.",
  },
  {
    name: "Shoulder Shrugs",
    instructions:
      "Lift both shoulders up toward your ears, hold for 3 seconds, then release. Repeat 10 times to release tension.",
  },
  {
    name: "Arm Circles",
    instructions:
      "Extend arms out to the sides. Make small circles forward for 10 seconds, then backward for 10 seconds. Gradually increase circle size.",
  },
  {
    name: "Chest Opener",
    instructions:
      "Clasp hands behind your back, straighten arms, and lift them slightly. Hold for 20 seconds while taking deep breaths.",
  },
  {
    name: "Side Stretch",
    instructions:
      "Raise your right arm overhead and lean to the left. Hold for 15 seconds. Switch sides and repeat. Feel the stretch along your side.",
  },
  {
    name: "Forward Fold",
    instructions:
      "Stand with feet hip-width apart. Slowly bend forward from your hips, letting your arms hang. Hold for 20 seconds, then slowly roll up.",
  },
  {
    name: "Seated Spinal Twist",
    instructions:
      "Sit cross-legged. Place right hand behind you, left hand on right knee. Gently twist to the right. Hold 20 seconds. Switch sides.",
  },
  {
    name: "Cat-Cow Stretch",
    instructions:
      "On hands and knees, arch your back (cow), then round it (cat). Alternate slowly 10 times, coordinating with your breath.",
  },
  {
    name: "Hip Flexor Stretch",
    instructions:
      "Kneel on right knee, left foot forward. Push hips forward gently until you feel a stretch. Hold 20 seconds. Switch legs.",
  },
  {
    name: "Ankle Circles",
    instructions:
      "Sit comfortably. Lift one foot and rotate ankle in circles, 10 times each direction. Switch feet. Great for circulation.",
  },
]

export function TakeABreak({ onClose }: TakeABreakProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(null)
  const [selectedDrinkType, setSelectedDrinkType] = useState<"warm" | "cold">("warm")
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<keyof typeof motivationalQuotes>("love")

  const [walkTime, setWalkTime] = useState(5 * 60) // 5 minutes in seconds
  const [isWalking, setIsWalking] = useState(false)
  const [walkDuration, setWalkDuration] = useState(5) // 5 or 10 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWalking && walkTime > 0) {
      interval = setInterval(() => {
        setWalkTime((prev) => prev - 1)
      }, 1000)
    } else if (walkTime === 0) {
      setIsWalking(false)
      // Play a sound or show notification when timer ends
    }
    return () => clearInterval(interval)
  }, [isWalking, walkTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const resetWalkTimer = () => {
    setIsWalking(false)
    setWalkTime(walkDuration * 60)
  }

  const handleBack = () => {
    setSelectedActivity(null)
    resetWalkTimer()
  }

  if (!selectedActivity) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="p-6 md:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Take a Break</h2>
              <p className="text-muted-foreground">Step away and recharge with one of these activities</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {breakActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <Card
                    key={activity.title}
                    className="p-4 hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedActivity(activity.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <Button onClick={onClose} className="w-full" size="lg">
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedActivity === "warm-drink") {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen flex items-start justify-center p-4 py-8">
          <div className="w-full max-w-3xl">
            <Card className="p-6 md:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <Button variant="ghost" onClick={handleBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Make a Drink</h2>
                <p className="text-muted-foreground">Follow these simple recipes to prepare a comforting beverage</p>
              </div>

              <div className="flex gap-2 mb-6 justify-center">
                <Button
                  variant={selectedDrinkType === "warm" ? "default" : "outline"}
                  onClick={() => setSelectedDrinkType("warm")}
                >
                  Warm Drinks
                </Button>
                <Button
                  variant={selectedDrinkType === "cold" ? "default" : "outline"}
                  onClick={() => setSelectedDrinkType("cold")}
                >
                  Cold Drinks
                </Button>
              </div>

              <div className="space-y-6 mb-8">
                {drinkRecipes[selectedDrinkType].map((recipe, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{recipe.name}</h3>

                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Ingredients:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Procedure:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {recipe.procedure.map((step, i) => (
                          <li key={i} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </Card>
                ))}
              </div>

              <Button onClick={onClose} className="w-full" size="lg">
                Back to Dashboard
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (selectedActivity === "walk") {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <Card className="p-6 md:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <Button variant="ghost" onClick={handleBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Footprints className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Take a Short Walk</h2>
                <p className="text-muted-foreground">Set a timer and enjoy some fresh air</p>
              </div>

              <div className="flex gap-2 mb-8 justify-center">
                <Button
                  variant={walkDuration === 5 ? "default" : "outline"}
                  onClick={() => {
                    setWalkDuration(5)
                    setWalkTime(5 * 60)
                    setIsWalking(false)
                  }}
                  disabled={isWalking}
                >
                  5 Minutes
                </Button>
                <Button
                  variant={walkDuration === 10 ? "default" : "outline"}
                  onClick={() => {
                    setWalkDuration(10)
                    setWalkTime(10 * 60)
                    setIsWalking(false)
                  }}
                  disabled={isWalking}
                >
                  10 Minutes
                </Button>
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl md:text-7xl font-bold text-foreground mb-6">{formatTime(walkTime)}</div>

                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={() => setIsWalking(!isWalking)} disabled={walkTime === 0}>
                    {isWalking ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button size="lg" variant="outline" onClick={resetWalkTimer}>
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {walkTime === 0 && (
                  <p className="text-green-500 font-medium mt-4">Great job! Time for your walk is complete!</p>
                )}
              </div>

              <Button onClick={onClose} className="w-full" size="lg">
                Back to Dashboard
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (selectedActivity === "quotes") {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-3xl my-8">
          <Card className="p-6 md:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <Button variant="ghost" onClick={handleBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Motivational Quotes</h2>
              <p className="text-muted-foreground">Find inspiration in these uplifting words</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {(Object.keys(motivationalQuotes) as Array<keyof typeof motivationalQuotes>).map((category) => (
                <Button
                  key={category}
                  variant={selectedQuoteCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedQuoteCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              {motivationalQuotes[selectedQuoteCategory].map((quote, index) => (
                <Card key={index} className="p-6 bg-card/50">
                  <p className="text-lg text-foreground italic text-center leading-relaxed">"{quote}"</p>
                </Card>
              ))}
            </div>

            <Button onClick={onClose} className="w-full" size="lg">
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedActivity === "stretch") {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen flex items-start justify-center p-4 py-8">
          <div className="w-full max-w-3xl">
            <Card className="p-6 md:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <Button variant="ghost" onClick={handleBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Stretching Exercises</h2>
                <p className="text-muted-foreground">10 basic stretches to release tension and improve flexibility</p>
              </div>

              <div className="space-y-4 mb-8">
                {stretchingExercises.map((exercise, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{exercise.name}</h3>
                        <p className="text-muted-foreground leading-relaxed">{exercise.instructions}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button onClick={onClose} className="w-full" size="lg">
                Back to Dashboard
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
}
