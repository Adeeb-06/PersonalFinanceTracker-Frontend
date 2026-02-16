export function BalanceTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          {/* Date */}
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-secondary rounded" />
          </td>

          {/* Time */}
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-secondary rounded" />
          </td>

          {/* Amount */}
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-secondary rounded" />
          </td>

          {/* Category */}
          <td className="px-6 py-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-secondary rounded" />
              <div className="h-3 w-32 bg-secondary rounded" />
            </div>
          </td>

          {/* Actions */}
          <td className="px-6 py-4 text-center">
            <div className="h-8 w-8 bg-secondary rounded-lg mx-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}
