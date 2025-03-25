export function getBaseDateTime(): { base_date: string; base_time: string } {
  const now = new Date();

  const adjusted = new Date(now);
  adjusted.setHours(adjusted.getHours() - 1); // 한 시간 전

  const yyyy = adjusted.getFullYear().toString();
  const mm = String(adjusted.getMonth() + 1).padStart(2, '0');
  const dd = String(adjusted.getDate()).padStart(2, '0');
  const hh = String(adjusted.getHours()).padStart(2, '0');

  return {
    base_date: `${yyyy}${mm}${dd}`,
    base_time: `${hh}00`,
  };
}
