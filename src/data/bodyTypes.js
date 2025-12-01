// data/fashion/bodyTypes.js
export const bodyTypes = [
  {
    name: "Apple",
    icon: "🍎",
    traits: "Wider torso with narrower hips.",
    howToRecognize: "Your torso (bust/shoulders and waist) is larger than your hips. Your waist can be the same size or wider than bust/shoulders. Hips are the smallest measurement.",
    criteria: {
      waist_same_or_larger_than_bustShoulder: true,
      bustShoulder_and_waist_larger_than_hips: true,
      hips_smallest: true,
    },
    tops: [
      { name: "V-neck", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/vneck.png" },
      { name: "Wrap tops", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/wrapdress.png" },
      { name: "Empire waist", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/empirewaist.png" }
    ],
    bottoms: [
      { name: "Bootcut jeans", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/flaredjeans.png" },
      { name: "A-line skirts", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/a-line.png" }
    ],
    dress: [
      { name: "Empire waist", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/empirewaist.png" },
      { name: "A-line dress", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/a-line.png" }
    ],
    outer: [
      { name: "Long cardigan", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/longcardigan.png" },
      { name: "Open blazer", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/openblazer.png" }
    ],
    color: "from-emerald-500 to-teal-500",
    image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/apple.png"
  },
  {
    name: "Hourglass",
    icon: "⌛",
    traits: "Defined waist with balanced shoulders/bust and hips.",
    howToRecognize: "Your hips and bust/shoulders have similar width (within ~5% difference) and your waist is significantly smaller (≥ 25%). The silhouette looks like \"big-small-big\".",
    criteria: {
      bust_to_hip_ratio: "within 5%",
      waist_to_upperLower_ratio: "waist ≥ 25% smaller",
    },
    tops: [
      { name: "Wrap tops", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/wrapdress.png" },
      { name: "Fitted shirts", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/categories/blouse.png" },
      { name: "V-neck", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/vneck.png" }
    ],
    bottoms: [
      { name: "High-waisted jeans", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/highwaisted.png" },
      { name: "Pencil skirts", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/shiftdress.png" }
    ],
    dress: [
      { name: "Bodycon", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/bodycon.png" },
      { name: "Wrap dress", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/wrapdress.png" },
      { name: "Fit and flare", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/fitandflare.png" }
    ],
    outer: [
      { name: "Belted coats", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/beltedcoats.png" },
      { name: "Fitted blazers", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/fittedblazers.png" }
    ],
    color: "from-pink-500 to-rose-500",
    image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/hourglass.png"
  },
  {
    name: "Inverted Triangle",
    icon: "🔺",
    traits: "Shoulders/bust wider than hips.",
    howToRecognize: "Your upper body (shoulders or bust) is noticeably broader than your hips — more than 5% difference. Legs tend to look slim.",
    criteria: {
      hips_smallest: true,
      bustShoulder_to_hip_ratio: "≥ 5% bigger",
    },
    tops: [
      { name: "V-neck", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/vneck.png" },
      { name: "Wrap tops", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/wrapdress.png" },
      { name: "Raglan sleeves", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/raglan.png" }
    ],
    bottoms: [
      { name: "Wide-leg pants", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/widelegpants.png" },
      { name: "Flared jeans", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/flaredjeans.png" },
      { name: "A-line skirt", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/a-line.png" }
    ],
    dress: [
      { name: "A-line dress", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/a-line.png" },
      { name: "Bias-cut dress", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/biascut.png" },
      { name: "Fit and flare", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/fitandflare.png" }
    ],
    outer: [
      { name: "Structured coats", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/structuredcoat.png" },
      { name: "Peplum blazer", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/peplumblazer.png" }
    ],
    color: "from-red-500 to-orange-500",
    image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/invertedtriangle.png"
  },
  {
    name: "Pear",
    icon: "🍐",
    traits: "Hips wider than shoulders and bust.",
    howToRecognize: "Your hips are the largest measurement and at least 5% bigger than bust/shoulders. Your waist is smaller and well-defined.",
    criteria: {
      hips_largest: true,
      hips_to_bustShoulder_ratio: "hips ≥ 5% larger",
      waist_smallest: true,
    },
    tops: [
      { name: "Boat neck", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/boatneck.png" },
      { name: "Square neck", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/offshoulder.png" },
      { name: "Puff sleeves", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/capsleeve.png" }
    ],
    bottoms: [
      { name: "Straight pants", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/straightpants.png" },
      { name: "A-line skirt", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/a-line.png" }
    ],
    dress: [
      { name: "Empire waist", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/empirewaist.png" },
      { name: "Fit and flare", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/fitandflare.png" }
    ],
    outer: [
      { name: "Cropped jacket", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/croppedjacket.png" },
      { name: "Structured blazer", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/structuredcoat.png" }
    ],
    color: "from-purple-500 to-indigo-500",
    image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/pear.png"
  },
  {
    name: "Rectangle",
    icon: "▭",
    traits: "Balanced shoulders and hips with little waist definition.",
    howToRecognize: "Your shoulders/bust and hips have very similar width (within ~5% difference). Your waist is not significantly smaller — less than 25% smaller than your bust/shoulders.",
    criteria: {
      bustShoulder_to_hip_ratio: "within 5%",
      waist_to_bustShoulder_ratio: "waist less than 25% smaller",
    },
    tops: [
      { name: "Peplum tops", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/ruched.png" },
      { name: "Ruffled blouse", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/categories/blouse.png" },
      { name: "Off-the-shoulder", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/offshoulder.png" }
    ],
    bottoms: [
      { name: "Wide-leg pants", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/widelegpants.png" },
      { name: "Pleated skirts", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/pleats.png" },
      { name: "Bootcut jeans", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/flaredjeans.png" }
    ],
    dress: [
      { name: "Belted dress", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/wrapdress.png" },
      { name: "Wrap dress", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/wrapdress.png" },
      { name: "Fit and flare", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/dictionary/fitandflare.png" }
    ],
    outer: [
      { name: "Tailored blazer", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/fittedblazers.png" },
      { name: "Trench coat", image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/trenchcoat.png" }
    ],
    color: "from-blue-500 to-cyan-500",
    image: "https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion/body-types/rectangle.png"
  }
];