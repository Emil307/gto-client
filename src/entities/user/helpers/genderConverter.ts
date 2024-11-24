export function convertGender(
  gender: "male" | "female" | "default" | undefined
) {
  if (gender === "male") {
    return "Мужской";
  }
  if (gender === "female") {
    return "Женский";
  }
  return "Не указан";
}
