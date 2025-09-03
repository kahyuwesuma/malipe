export const formatTanggal = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
};