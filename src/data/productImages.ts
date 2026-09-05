import tools from "@/assets/tools.jpg";
import rolls from "@/assets/film-rolls.jpg";
import detailing from "@/assets/detailing.jpg";
import interior from "@/assets/interior.jpg";

/** Fallback images for catalog items that have no uploaded picture yet. */
export const productImageBySlug: Record<string, string> = {
  "squeegee-hard": tools,
  "squeegee-soft": tools,
  "precision-knife": tools,
  "blades-9mm": tools,
  microfiber: detailing,
  "slip-solution": detailing,
  "glass-cleaner": interior,
  "interior-cleaner": interior,
  "ppf-roll": rolls,
  "tint-roll": rolls,
  "heat-gun": tools,
  "spray-bottle": tools,
};

export const defaultProductImage = tools;
