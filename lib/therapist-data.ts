export interface Therapist {
  id: string
  name: string
  credentials: string
  specialty: string[]
  approach: string
  experience: number
  location: string
  availability: "accepting" | "waitlist" | "full"
  image: string
  bio: string
  languages: string[]
  insurance: boolean
}

export const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    credentials: "PhD, Licensed Clinical Psychologist",
    specialty: ["Anxiety", "Depression", "Trauma"],
    approach: "Cognitive Behavioral Therapy (CBT)",
    experience: 12,
    location: "San Francisco, CA",
    availability: "accepting",
    image: "/professional-woman-therapist.png",
    bio: "Specializing in evidence-based treatments for anxiety and depression with a compassionate, client-centered approach.",
    languages: ["English", "Mandarin"],
    insurance: true,
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    credentials: "LMFT, Licensed Marriage and Family Therapist",
    specialty: ["Relationships", "Family Therapy", "Communication"],
    approach: "Emotionally Focused Therapy (EFT)",
    experience: 8,
    location: "Los Angeles, CA",
    availability: "accepting",
    image: "/professional-man-therapist.png",
    bio: "Helping couples and families build stronger connections through improved communication and emotional understanding.",
    languages: ["English", "Spanish"],
    insurance: true,
  },
  {
    id: "3",
    name: "Dr. Emily Thompson",
    credentials: "PsyD, Clinical Psychologist",
    specialty: ["PTSD", "Trauma", "Grief"],
    approach: "EMDR and Trauma-Focused Therapy",
    experience: 15,
    location: "New York, NY",
    availability: "waitlist",
    image: "/professional-woman-psychologist.png",
    bio: "Experienced in trauma recovery and PTSD treatment, providing a safe space for healing and growth.",
    languages: ["English"],
    insurance: true,
  },
  {
    id: "4",
    name: "James Park",
    credentials: "LCSW, Licensed Clinical Social Worker",
    specialty: ["Depression", "Life Transitions", "Stress Management"],
    approach: "Mindfulness-Based Therapy",
    experience: 6,
    location: "Seattle, WA",
    availability: "accepting",
    image: "/asian-therapist.png",
    bio: "Integrating mindfulness practices with traditional therapy to help clients navigate life's challenges with greater ease.",
    languages: ["English", "Korean"],
    insurance: false,
  },
  {
    id: "5",
    name: "Dr. Aisha Patel",
    credentials: "MD, Psychiatrist",
    specialty: ["Medication Management", "Bipolar Disorder", "Anxiety"],
    approach: "Integrative Psychiatry",
    experience: 10,
    location: "Chicago, IL",
    availability: "accepting",
    image: "/professional-woman-psychiatrist.jpg",
    bio: "Combining medication management with holistic approaches to mental health care.",
    languages: ["English", "Hindi", "Gujarati"],
    insurance: true,
  },
  {
    id: "6",
    name: "Rachel Martinez",
    credentials: "LPC, Licensed Professional Counselor",
    specialty: ["LGBTQ+ Issues", "Identity", "Self-Esteem"],
    approach: "Person-Centered Therapy",
    experience: 7,
    location: "Austin, TX",
    availability: "full",
    image: "/professional-woman-counselor.png",
    bio: "Creating an affirming space for LGBTQ+ individuals to explore identity and build self-acceptance.",
    languages: ["English", "Spanish"],
    insurance: true,
  },
]

export const specialties = [
  "Anxiety",
  "Depression",
  "Trauma",
  "PTSD",
  "Relationships",
  "Family Therapy",
  "LGBTQ+ Issues",
  "Grief",
  "Stress Management",
  "Life Transitions",
  "Medication Management",
  "Bipolar Disorder",
]

export const locations = [
  "San Francisco, CA",
  "Los Angeles, CA",
  "New York, NY",
  "Seattle, WA",
  "Chicago, IL",
  "Austin, TX",
]
