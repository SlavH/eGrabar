/**
 * Simple helper to format date in Armenian
 */
export const formatArmenianDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    "հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի",
    "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի"
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};
