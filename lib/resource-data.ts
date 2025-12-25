export interface Resource {
  id: string
  title: string
  category: string
  description: string
  content: string
  readTime: number
  image: string
  author: string
  url: string
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety: What It Is and How to Manage It",
    category: "Anxiety",
    description:
      "Learn about anxiety disorders, their symptoms, and evidence-based strategies for managing anxiety in daily life.",
    content:
      "Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. Understanding the difference between normal anxiety and anxiety disorders is the first step toward managing it effectively.",
    readTime: 5,
    image: "/calm-peaceful-nature.jpg",
    author: "Mayo Clinic Staff",
    url: "https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961",
  },
  {
    id: "2",
    title: "Depression: Signs, Symptoms, and Treatment Options",
    category: "Depression",
    description:
      "Comprehensive guide to recognizing depression and exploring various treatment approaches including therapy and lifestyle changes.",
    content:
      "Depression is more than just feeling sad. It's a serious mental health condition that affects how you think, feel, and handle daily activities. Recognizing the signs early can lead to more effective treatment.",
    readTime: 7,
    image: "/supportive-mental-health.jpg",
    author: "National Institute of Mental Health",
    url: "https://www.nimh.nih.gov/health/topics/depression",
  },
  {
    id: "3",
    title: "The Power of Mindfulness and Meditation",
    category: "Self-Care",
    description:
      "Discover how mindfulness practices can reduce stress, improve focus, and enhance overall mental well-being.",
    content:
      "Mindfulness is the practice of being present in the moment without judgment. Research shows that regular mindfulness practice can reduce stress, anxiety, and depression while improving overall quality of life.",
    readTime: 4,
    image: "/meditation-peaceful.jpg",
    author: "American Psychological Association",
    url: "https://www.apa.org/topics/mindfulness/meditation",
  },
  {
    id: "4",
    title: "Building Healthy Relationships and Communication Skills",
    category: "Relationships",
    description:
      "Essential tips for developing strong, supportive relationships and improving communication with loved ones.",
    content:
      "Healthy relationships are built on trust, respect, and effective communication. Learning to express your needs and listen actively can transform your connections with others.",
    readTime: 6,
    image: "/people-connection-support.jpg",
    author: "HelpGuide.org",
    url: "https://www.helpguide.org/articles/relationships-communication/relationship-help.htm",
  },
  {
    id: "5",
    title: "Coping with Stress: Practical Strategies That Work",
    category: "Stress Management",
    description: "Evidence-based techniques for managing stress and building resilience in challenging times.",
    content:
      "Stress is an inevitable part of life, but how we respond to it makes all the difference. Learn practical strategies to manage stress effectively and build long-term resilience.",
    readTime: 5,
    image: "/relaxation-calm.jpg",
    author: "Mental Health America",
    url: "https://www.mhanational.org/stress",
  },
  {
    id: "6",
    title: "Understanding Trauma and PTSD",
    category: "Trauma",
    description: "Learn about trauma responses, PTSD symptoms, and pathways to healing and recovery.",
    content:
      "Trauma can have lasting effects on mental health, but understanding these effects is the first step toward healing. PTSD is treatable, and many people recover with proper support.",
    readTime: 8,
    image: "/healing-recovery.jpg",
    author: "National Center for PTSD",
    url: "https://www.ptsd.va.gov/understand/what/index.asp",
  },
  {
    id: "7",
    title: "Sleep and Mental Health: The Critical Connection",
    category: "Self-Care",
    description:
      "Explore the relationship between sleep quality and mental health, plus tips for better sleep hygiene.",
    content:
      "Quality sleep is essential for mental health. Poor sleep can worsen anxiety and depression, while good sleep hygiene can significantly improve your mood and cognitive function.",
    readTime: 5,
    image: "/peaceful-sleep-rest.jpg",
    author: "Sleep Foundation",
    url: "https://www.sleepfoundation.org/mental-health",
  },
  {
    id: "8",
    title: "Breaking the Stigma: Talking About Mental Health",
    category: "Awareness",
    description:
      "Understanding mental health stigma and how to have open, supportive conversations about mental wellness.",
    content:
      "Mental health stigma prevents many people from seeking help. By talking openly about mental health, we can create a more supportive and understanding society.",
    readTime: 4,
    image: "/community-support.jpg",
    author: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
  },
]

export const categories = [
  "All",
  "Anxiety",
  "Depression",
  "Self-Care",
  "Relationships",
  "Stress Management",
  "Trauma",
  "Awareness",
]

export const crisisResources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 free and confidential support for people in distress",
    available: "24/7",
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, 24/7 support for those in crisis via text message",
    available: "24/7",
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service for mental health and substance use",
    available: "24/7",
  },
  {
    name: "NAMI Helpline",
    phone: "1-800-950-6264",
    description: "Information, referrals, and support for mental health concerns",
    available: "Mon-Fri, 10am-10pm ET",
  },
]
