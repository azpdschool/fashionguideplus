// data/bodyTypes.js
// Body shape definitions following The Concept Wardrobe methodology

export const bodyTypes = [
  {
    name: "Apple",
    icon: "🍎",
    traits: "Wider torso with narrower hips.",
    howToRecognize:
      "Your torso (bust/shoulders and waist) is larger than your hips. Your waist can be the same size or wider than bust/shoulders. Hips are the smallest measurement.",
    criteria: {
      waist_same_or_larger_than_bustShoulder: true,
      bustShoulder_and_waist_larger_than_hips: true,
      hips_smallest: true,
    },
    tops: [
      { name: "V-neck", image: "/images/fashion/vneck.png" },
      { name: "Wrap tops", image: "/images/fashion/wraptops.png" },
      { name: "Empire waist", image: "/images/fashion/empirewaist.png" }
    ],
    bottoms: [
      { name: "Bootcut jeans", image: "/images/fashion/bootcutjeans.png" },
      { name: "A-line skirts", image: "/images/fashion/askirt.png" }
    ],
    dress: [
      { name: "Empire waist", image: "/images/fashion/empirewaist.png" },
      { name: "A-line dress", image: "/images/fashion/askirt.png" }
    ],
    outer: [
      { name: "Long cardigan", image: "/images/fashion/longcardigan.png" },
      { name: "Open blazer", image: "/images/fashion/openblazer.png" }
    ],
    color: "from-emerald-500 to-teal-500",
    image: "/images/fashion/body-types/apple.jpg"
  },

  {
    name: "Hourglass",
    icon: "⌛",
    traits: "Defined waist with balanced shoulders/bust and hips.",
    howToRecognize:
      "Your hips and bust/shoulders have similar width (within ~5% difference) and your waist is significantly smaller (≥ 25%). The silhouette looks like “big-small-big”.",
    criteria: {
      bust_to_hip_ratio: "within 5%",
      waist_to_upperLower_ratio: "waist ≥ 25% smaller",
    },
    tops: [
      { name: "Wrap tops", image: "/images/fashion/wraptops.png" },
      { name: "Fitted shirts", image: "/images/fashion/fittedshirts.png" },
      { name: "V-neck", image: "/images/fashion/vneck.png" }
    ],
    bottoms: [
      { name: "High-waisted jeans", image: "/images/fashion/highwaistedjeans.png" },
      { name: "Pencil skirts", image: "/images/fashion/pencilskirts.png" }
    ],
    dress: [
      { name: "Bodycon", image: "/images/fashion/bodycon.png" },
      { name: "Wrap dress", image: "/images/fashion/wrapdress.png" },
      { name: "Fit and flare", image: "/images/fashion/fitandflare.png" }
    ],
    outer: [
      { name: "Belted coats", image: "/images/fashion/beltedcoats.png" },
      { name: "Fitted blazers", image: "/images/fashion/fittedblazers.png" }
    ],
    color: "from-pink-500 to-rose-500",
    image: "/images/fashion/body-types/hourglass.jpg"
  },

  {
    name: "Inverted Triangle",
    icon: "🔺",
    traits: "Shoulders/bust wider than hips.",
    howToRecognize:
      "Your upper body (shoulders or bust) is noticeably broader than your hips — more than 5% difference. Legs tend to look slim.",
    criteria: {
      hips_smallest: true,
      bustShoulder_to_hip_ratio: "≥ 5% bigger",
    },
    tops: [
      { name: "V-neck", image: "/images/fashion/vneck.png" },
      { name: "Wrap tops", image: "/images/fashion/wraptops.png" },
      { name: "Raglan sleeves", image: "/images/fashion/raglansleeves.png" }
    ],
    bottoms: [
      { name: "Wide-leg pants", image: "/images/fashion/widelegpants.png" },
      { name: "Flared jeans", image: "/images/fashion/flaredjeans.png" },
      { name: "A-line skirt", image: "/images/fashion/askirt.png" }
    ],
    dress: [
      { name: "A-line dress", image: "/images/fashion/alinedress.png" },
      { name: "Bias-cut dress", image: "/images/fashion/biascutdress.png" },
      { name: "Fit and flare", image: "/images/fashion/fitandflare.png" }
    ],
    outer: [
      { name: "Structured coats", image: "/images/fashion/structuredcoat.png" },
      { name: "Peplum blazer", image: "/images/fashion/peplumblazer.png" }
    ],
    color: "from-red-500 to-orange-500",
    image: "/images/fashion/body-types/invertedtriangle.jpg"
  },

  {
    name: "Pear",
    icon: "🍐",
    traits: "Hips wider than shoulders and bust.",
    howToRecognize:
      "Your hips are the largest measurement and at least 5% bigger than bust/shoulders. Your waist is smaller and well-defined.",
    criteria: {
      hips_largest: true,
      hips_to_bustShoulder_ratio: "hips ≥ 5% larger",
      waist_smallest: true,
    },
    tops: [
      { name: "Boat neck", image: "/images/fashion/boatneck.png" },
      { name: "Square neck", image: "/images/fashion/squareneck.png" },
      { name: "Puff sleeves", image: "/images/fashion/puffsleeve.png" }
    ],
    bottoms: [
      { name: "Straight pants", image: "/images/fashion/straightpants.png" },
      { name: "A-line skirt", image: "/images/fashion/askirt.png" }
    ],
    dress: [
      { name: "Empire waist", image: "/images/fashion/empirewaist.png" },
      { name: "Fit and flare", image: "/images/fashion/fitandflare.png" }
    ],
    outer: [
      { name: "Cropped jacket", image: "/images/fashion/croppedjacket.png" },
      { name: "Structured blazer", image: "/images/fashion/structuredblazer.png" }
    ],
    color: "from-purple-500 to-indigo-500",
    image: "/images/fashion/body-types/pear.jpg"
  },

  {
    name: "Rectangle",
    icon: "▭",
    traits: "Balanced shoulders and hips with little waist definition.",
    howToRecognize:
      "Your shoulders/bust and hips have very similar width (within ~5% difference). Your waist is not significantly smaller — less than 25% smaller than your bust/shoulders.",
    criteria: {
      bustShoulder_to_hip_ratio: "within 5%",
      waist_to_bustShoulder_ratio: "waist less than 25% smaller",
    },
    tops: [
      { name: "Peplum tops", image: "/images/fashion/peplumtops.png" },
      { name: "Ruffled blouse", image: "/images/fashion/ruffledblouse.png" },
      { name: "Off-the-shoulder", image: "/images/fashion/offshoulder.png" }
    ],
    bottoms: [
      { name: "Wide-leg pants", image: "/images/fashion/widelegpants.png" },
      { name: "Pleated skirts", image: "/images/fashion/pleatedskirts.png" },
      { name: "Bootcut jeans", image: "/images/fashion/bootcutjeans.png" }
    ],
    dress: [
      { name: "Belted dress", image: "/images/fashion/belteddress.png" },
      { name: "Wrap dress", image: "/images/fashion/wrapdress.png" },
      { name: "Fit and flare", image: "/images/fashion/fitandflare.png" }
    ],
    outer: [
      { name: "Tailored blazer", image: "/images/fashion/structuredblazer.png" },
      { name: "Trench coat", image: "/images/fashion/trenchcoat.png" }
    ],
    color: "from-blue-500 to-cyan-500",
    image: "/images/fashion/body-types/rectangle.jpg"
  }
];
