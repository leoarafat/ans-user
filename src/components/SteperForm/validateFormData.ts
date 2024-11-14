import { requiredFields } from "./FormType";

export const validateFormData = (formData: any): string[] => {
  const missingFields: string[] = [];

  Object.entries(requiredFields).forEach(([section, fields]) => {
    fields.forEach((field) => {
      const value = (formData as any)[section][field];

      if (Array.isArray(value)) {
        if (!value.length) {
          missingFields.push(`${section}.${field}`);
        }
      } else if (field === "audioFile" || field === "coverImage") {
        if (!(value instanceof File) || !value.name) {
          missingFields.push(`${section}.${field}`);
        }
      } else {
        if (!value || value.trim() === "") {
          missingFields.push(`${section}.${field}`);
        }
      }
    });
  });

  return missingFields;
};
