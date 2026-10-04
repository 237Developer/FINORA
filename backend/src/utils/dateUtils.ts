export function getDateRangeByFrequency(
  frequency?: string,
  startDate?: string,
  endDate?: string,
) {
  const now = new Date();
  let start: Date;
  let end: Date;

  const freq = (frequency || "cettesemaine").toLowerCase();

  switch (freq) {
    case "aujourdhui": {
      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0,
      );
      end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999,
      );
      break;
    }
    case "cette-semaine":
    case "cettesemaine":
    case "semaine": {
      const tempDate = new Date();
      const day = tempDate.getDay();
      const diffToMonday = tempDate.getDate() - day + (day === 0 ? -6 : 1);
      start = new Date(tempDate.setDate(diffToMonday));
      start.setHours(0, 0, 0, 0);

      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case "ce-mois":
    case "cemois":
    case "cemoici":
    case "mois": {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    }
    case "toutes":
    case "all": {
      start = new Date(2000, 0, 1);
      end = new Date(2100, 11, 31, 23, 59, 59, 999);
      break;
    }
    case "personnalise":
    case "custom": {
      start = startDate
        ? new Date(startDate)
        : new Date(now.getFullYear(), now.getMonth(), 1);
      end = endDate ? new Date(endDate) : new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    }
    default: {
      const tempDate = new Date();
      const day = tempDate.getDay();
      const diffToMonday = tempDate.getDate() - day + (day === 0 ? -6 : 1);
      start = new Date(tempDate.setDate(diffToMonday));
      start.setHours(0, 0, 0, 0);

      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }
  }

  return { start, end };
}
