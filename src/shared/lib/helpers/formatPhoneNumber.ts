export function formatPhoneNumber(input: string) {
  // Remove any existing spaces
  input = input.replace(/\s+/g, "");

  // Validate input format
  if (!/^\+998\d{9}$/.test(input)) {
    throw new Error(
      'Invalid phone number format. It should start with "+998" and contain 9 digits.',
    );
  }

  // Format the phone number
  const countryCode = input.slice(0, 4); // "+998"
  const part1 = input.slice(4, 6); // "99"
  const part2 = input.slice(6, 9); // "300"
  const part3 = input.slice(9, 11); // "23"
  const part4 = input.slice(11); // "99"

  return `${countryCode} ${part1} ${part2} ${part3} ${part4}`;
}
