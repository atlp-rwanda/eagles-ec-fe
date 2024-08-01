export const transformStatsData = (stats) => {
  const monthNames = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthIndex = new Date().getMonth();

  const chartData = stats
    .map((stat) => ({
      name: monthNames[stat.month],
      sales: stat.monthlySales,
      products: stat.totalProducts,
    }))
    .filter((data) => monthOrder.indexOf(data.name) <= currentMonthIndex)
    .sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));

  const totalLosses = stats.reduce((acc, stat) => acc + stat.losses, 0);
  const expiredProducts = stats.reduce(
    (acc, stat) => acc.concat(stat.expiredProducts),
    [],
  );
  const totalSales = stats.reduce((acc, stat) => acc + stat.monthlySales, 0);
  const totalRevenue = stats.reduce(
    (acc, stat) => acc + stat.monthlyRevenue,
    0,
  );

  return {
    chartData,
    totalLosses,
    expiredProducts,
    totalSales,
    totalRevenue,
  };
};
