import React from 'react';

export function BalanceTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <tbody className="divide-y divide-gray-800 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {/* Date */}
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-gray-700 rounded" />
          </td>

          {/* Time */}
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-gray-700 rounded" />
          </td>

          {/* Amount */}
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-gray-700 rounded" />
          </td>

  

          {/* Category */}
          <td className="px-6 py-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-700 rounded" />
              <div className="h-3 w-32 bg-gray-700 rounded" />
            </div>
          </td>

          {/* Actions */}
          <td className="px-6 py-4 text-center">
            <div className="h-8 w-8 bg-gray-700 rounded-lg mx-auto" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
