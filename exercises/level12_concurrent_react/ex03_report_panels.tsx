/**
 * PROVIDED for ex03_lazy_and_suspense: you don't need to change this file.
 *
 * Two "heavy" panels. In a real app they might pull in a big chart
 * library. Exercise 3 loads this file only when a panel is first shown,
 * using React.lazy and a dynamic import().
 */

const SALES = [
  { month: "Jan", total: 120 },
  { month: "Feb", total: 95 },
  { month: "Mar", total: 140 },
];

export function SalesChart() {
  return (
    <section aria-labelledby="sales-chart-heading">
      <h2 id="sales-chart-heading">Sales chart</h2>
      {SALES.map((row) => (
        <div key={row.month}>
          {row.month} {"#".repeat(row.total / 10)}
        </div>
      ))}
    </section>
  );
}

export function SalesTable() {
  return (
    <section aria-labelledby="sales-table-heading">
      <h2 id="sales-table-heading">Sales table</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {SALES.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
