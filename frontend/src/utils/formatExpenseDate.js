import { format, isSameDay, isToday, isYesterday, subDays } from "date-fns";
import { fr } from "date-fns/locale";

const formatTime = (date) => format(date, "HH:mm", { locale: fr });

export function formatExpenseDate(value) {
  const expenseDate = new Date(value);
  console.log(expenseDate);

  if (Number.isNaN(expenseDate.getTime())) {
    return "";
  }

  const time = formatTime(expenseDate);

  if (isToday(expenseDate)) {
    return `Aujourd'hui · ${time}`;
  }

  if (isYesterday(expenseDate)) {
    return `Hier · ${time}`;
  }

  if (isSameDay(expenseDate, subDays(new Date(), 2))) {
    return `Avant-hier · ${time}`;
  }

  console.log(format(expenseDate, "d MMM HH:mm", { locale: fr }));
  return format(expenseDate, "d MMM HH:mm", { locale: fr });
}
