export function getEmailInitials(email) {
  const localPart = email?.trim().split("@")[0];

  if (!localPart) {
    return "";
  }

  const nameParts = localPart
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[._\-\s]+/)
    .filter(Boolean);

  if (nameParts.length >= 2) {
    return nameParts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  return localPart.slice(0, 2).toUpperCase();
}
