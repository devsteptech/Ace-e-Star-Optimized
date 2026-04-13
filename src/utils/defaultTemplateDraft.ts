import type { TemplateDraft } from "../types/templateEditorTypes";

export const defaultTemplateDraft = {
  templateName: "Sarah & Michael's Wedding",
  eventType: "Wedding",
  enableCheckoutTag: true,

  checkInTagSize: "8x2",
  checkOutTagSize: "8x2",
  checkOutTagText: "",

  thumbnailUrl: "",

  screenBgUrl: "",
  screenLogoUrl: "",

  checkInBgUrl: "",
  checkInLogoUrl: "",

  checkOutBgUrl: "",
  checkOutLogoUrl: "",

  guestFields: [
    { id: "name", label: "Your Name", fieldName: "name" },
    { id: "relation", label: "Your Relation", fieldName: "relation" },
  ],
} satisfies TemplateDraft;