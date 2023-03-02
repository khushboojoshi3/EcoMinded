export const getFormattedDate = (sdate) => {
    const date = new Date(sdate);
    return (
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2)
    );
}
export const getYears = () => {
    const years = [];
    const curYear = new Date().getFullYear();
    for (let i = 2022; i <= curYear; i++) {
        years.push(i);
    }
    return years;
}

export const months = [
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