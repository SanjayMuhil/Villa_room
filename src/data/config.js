/**
 * Dinesh Boy - ECR Villa Booking Configuration
 * All business details, pricing, contact, and villa data live in this file.
 * The owner can edit this file directly without touching React components.
 */

export const siteConfig = {
  businessName: "Dinesh Boy",
  tagline: "Private Beachside Villas on East Coast Road, Chennai",
  description: "Experience luxury and serenity at Dinesh Boy private villas on ECR, Chennai. Featuring private swimming pools, AC bedrooms, lawn, kitchen, and sea breeze just minutes from the beach.",
  ownerName: "Dinesh Boy",
  phone: "7904708179",
  whatsappNumber: "917904708179",
  upiId: "lalithadinesh05-3@okicici",
  payeeName: "Dinesh Boy",
  address: "East Coast Road (ECR), Chennai, Tamil Nadu - 600115",
  googleMapsUrl: "https://maps.google.com/?q=East+Coast+Road+ECR+Chennai+Tamil+Nadu",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124446.56588266205!2d80.2075!3d12.875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525a74e7cfbd2b%3A0xc1b96a40a831518f!2sEast%20Coast%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  // Timings & Rules
  checkInTime: "12:00 PM",
  checkOutTime: "12:00 PM",
  weekendDays: ["Friday", "Saturday"], // Friday & Saturday nights are weekend rate
  advancePercentage: 50, // 50% advance for booking confirmation
  currencySymbol: "₹",

  // Villas List
  // To add a new villa (e.g. 4BHK or Resort), simply add a new object to this array.
  villas: [
    {
      id: "villa-2bhk",
      name: "2BHK Private Villa",
      tag: "Cozy Family Getaway",
      bedrooms: 2,
      maxGuests: 8,
      bathrooms: 2,
      weekdayRate: 4000,
      weekendRate: 6000,
      hasPool: false,
      featured: true,
      description: "A comfortable, fully air-conditioned 2-bedroom private villa nestled along the serene ECR belt. Perfect for nuclear families, couples, and small group weekend breaks.",
      features: [
        "2 Air-Conditioned Bedrooms",
        "Spacious Living Hall with Sofa",
        "Equipped Kitchenette & Refrigerator",
        "Private Gated Parking (2 Cars)",
        "High-Speed Wi-Fi",
        "Power Backup & Inverter",
        "Private Lawn & Garden Area",
        "5 Mins Walk to ECR Beach"
      ],
      images: [
        "/images/villa-2bhk-1.webp",
        "/images/villa-2bhk-2.webp",
        "/images/villa-2bhk-3.webp"
      ],
      imageAlts: [
        "Exterior facade of 2BHK private villa on ECR",
        "Air-conditioned master bedroom with plush king bed",
        "Comfortable living room with sofa seating and dining table"
      ],
      bookedDates: [
        "2026-11-21",
        "2026-11-22",
        "2026-11-28",
        "2026-12-05",
        "2026-12-06",
        "2026-12-31"
      ]
    },
    {
      id: "villa-3bhk",
      name: "3BHK Luxury Villa",
      tag: "Ideal for Gatherings & Friends",
      bedrooms: 3,
      maxGuests: 12,
      bathrooms: 3,
      weekdayRate: 7000,
      weekendRate: 10000,
      hasPool: false,
      featured: true,
      description: "Generous 3-bedroom villa designed for group reunions, celebrations, and corporate getaways. Offers large open-air terrace, breezy hall, and privacy.",
      features: [
        "3 Master AC Bedrooms with Attached Baths",
        "Grand Living & Dining Hall",
        "Open Terrace for Evening Chilling",
        "Full Kitchen with Gas Stove & Utensils",
        "Private Gated Parking (3 Cars)",
        "Sound System Support (Till 10 PM)",
        "Barbecue Grill Facility on Request",
        "Caretaker on Call 24/7"
      ],
      images: [
        "/images/villa-3bhk-1.webp",
        "/images/villa-3bhk-2.webp",
        "/images/villa-3bhk-3.webp"
      ],
      imageAlts: [
        "Modern 3BHK villa lawn and facade illuminated at night",
        "Master bedroom with private balcony view and AC",
        "Spacious open terrace deck for evening sea breeze"
      ],
      bookedDates: [
        "2026-11-20",
        "2026-11-21",
        "2026-12-12",
        "2026-12-13",
        "2026-12-25",
        "2026-12-31",
        "2027-01-01"
      ]
    },
    {
      id: "villa-3bhk-pool",
      name: "3BHK Villa with Private Swimming Pool",
      tag: "Most Popular • Private Pool",
      bedrooms: 3,
      maxGuests: 12,
      bathrooms: 4,
      weekdayRate: 8000,
      weekendRate: 13000,
      hasPool: true,
      featured: true,
      description: "Our signature ECR villa featuring an exclusive crystal-clear private swimming pool, poolside deck, premium interiors, and ambient evening lighting.",
      features: [
        "Exclusive Private Swimming Pool (Cleaned Daily)",
        "Poolside Lounge Deck & Sun Chairs",
        "3 King-Size AC Bedrooms with En-Suite Baths",
        "Spacious Living Hall with 55\" Smart TV",
        "Modern Kitchen & Refrigerator",
        "Music Setup & Ambient Party Lights",
        "Secure Gated Parking for 3+ Vehicles",
        "Minutes away from ECR Beach & Cafes"
      ],
      images: [
        "/images/villa-pool-1.webp",
        "/images/villa-pool-2.webp",
        "/images/villa-pool-3.webp",
        "/images/villa-pool-4.webp"
      ],
      imageAlts: [
        "Private swimming pool with clear water and sun deck",
        "Poolside terrace lounge and evening seating",
        "Interior living and dining hall with smart TV",
        "Private villa garden and pool illuminated at twilight"
      ],
      bookedDates: [
        "2026-11-20",
        "2026-11-21",
        "2026-11-22",
        "2026-11-27",
        "2026-11-28",
        "2026-12-24",
        "2026-12-25",
        "2026-12-31",
        "2027-01-01",
        "2027-01-02"
      ]
    }
  ],

  // Gallery images with real WebP photos from Unsplash
  gallery: [
    { id: 1, src: "/images/gallery-1.webp", caption: "Private Swimming Pool with Tropical Palms", category: "Pool & Outdoor", alt: "Private swimming pool surrounded by palm trees" },
    { id: 2, src: "/images/gallery-2.webp", caption: "Spacious AC Master Bedroom", category: "Bedrooms", alt: "Master bedroom with plush bed and air conditioning" },
    { id: 3, src: "/images/gallery-3.webp", caption: "Lush Green Front Lawn & Car Parking", category: "Exterior", alt: "Private villa lawn and gated parking at dusk" },
    { id: 4, src: "/images/gallery-4.webp", caption: "Airy Living Room with Plush Seating", category: "Living Area", alt: "Spacious living room with sofa seating" },
    { id: 5, src: "/images/gallery-5.webp", caption: "Open Terrace Deck for Evening Breeze", category: "Pool & Outdoor", alt: "Open-air villa terrace with scenic views" },
    { id: 6, src: "/images/gallery-6.webp", caption: "Golden Coastal Sunset on ECR", category: "Surroundings", alt: "Sunset horizon over waters on East Coast Road" },
    { id: 7, src: "/images/gallery-7.webp", caption: "Equipped Kitchen for Self-Cooking", category: "Kitchen", alt: "Modern kitchen equipped with gas stove and refrigerator" },
    { id: 8, src: "/images/gallery-8.webp", caption: "Sunny Afternoon at Private Pool", category: "Pool & Outdoor", alt: "Clear blue swimming pool under the sun" },
    { id: 9, src: "/images/gallery-9.webp", caption: "ECR Beach Shoreline - 5 Mins Away", category: "Surroundings", alt: "ECR sandy beach and sea waves" }
  ],

  whyChooseUs: [
    {
      title: "100% Private & Gated",
      desc: "The entire villa is exclusively yours. No shared spaces, no unwanted interruptions.",
      icon: "shield"
    },
    {
      title: "Private Swimming Pool",
      desc: "Pristine, well-maintained pool with fresh water treatment for every booking.",
      icon: "pool"
    },
    {
      title: "Prime ECR Location",
      desc: "Right on East Coast Road with easy access to beach, cafes, and Kovalam surf spots.",
      icon: "location"
    },
    {
      title: "Direct Owner Booking",
      desc: "Speak directly with Dinesh Boy. Zero platform commissions or hidden agent charges.",
      icon: "phone"
    },
    {
      title: "Self Cooking & Swiggy/Zomato",
      desc: "Fully functional kitchen with gas stove, plus food delivery right to the villa gate.",
      icon: "utensils"
    },
    {
      title: "Power Backup & Inverter",
      desc: "Uninterrupted AC, lights, and fans even during coastal power fluctuations.",
      icon: "bolt"
    }
  ],

  rules: [
    "Check-in is strictly at 12:00 PM and Check-out is at 12:00 PM next day.",
    "A 50% advance via UPI is required to block dates on the calendar.",
    "The remaining 50% must be cleared during check-in before keys are handed over.",
    "Loud music/speakers are permitted only until 10:00 PM as per Tamil Nadu police coastal regulations.",
    "Government photo ID (Aadhaar / Driving License / Voter ID) is mandatory for all adult guests at check-in.",
    "Pets may be permitted with prior notice for select villas; please confirm before booking.",
    "Pool rules: Proper swimwear required. Glass bottles strictly prohibited inside the pool."
  ]
};

export default siteConfig;
