import React, { useMemo } from 'react';
import { Participant, UserConfig } from '../types';
import { getGroupSummary, getOrInitAssignments } from '../utils';

interface ScreenResultProps {
  currentUser: Participant;
  userConfig: UserConfig;
}

export const ScreenResult: React.FC<ScreenResultProps> = ({ currentUser, userConfig }) => {
  const assignments = getOrInitAssignments();
  const recipient = assignments[currentUser];

  // Recalculate summary every render to catch updates
  const summary = useMemo(() => getGroupSummary(), []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Secret Assignment Card */}
      <div className="bg-christmas-green/10 border border-christmas-green w-full rounded-2xl p-6 text-center mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-christmas-green/20"></div>
        
        <h3 className="text-christmas-dark/70 font-semibold uppercase tracking-wide text-xs mb-4">
          Your Secret Mission
        </h3>
        
        <p className="text-lg text-christmas-dark mb-4 leading-relaxed">
          You must buy a <br/>
          <span className="font-bold text-christmas-red text-xl capitalize">{userConfig.colour}</span>,{' '}
          <span className="font-bold text-christmas-red text-xl capitalize">{userConfig.adjective}</span> gift for...
        </p>
        
        <div className="bg-white py-4 px-2 rounded-lg shadow-sm border border-christmas-green/10 transform rotate-1">
          <h1 className="text-4xl sm:text-5xl font-festive text-christmas-green">
            {recipient}
          </h1>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-christmas-dark/50">
           <span className="inline-block w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
           <span>Shh! Don't show anyone!</span>
        </div>
      </div>

      {/* Group Summary Table */}
      <div className="w-full">
        <h4 className="font-bold text-christmas-dark mb-4 border-b pb-2">Group Status</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-3 py-3 rounded-tl-lg">Name</th>
                <th className="px-3 py-3">Colour</th>
                <th className="px-3 py-3">Vibe</th>
                <th className="px-3 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row) => (
                <tr key={row.name} className="bg-white border-b last:border-0 hover:bg-gray-50">
                  <td className="px-3 py-3 font-medium text-gray-900">
                    {row.name} {row.name === currentUser && '(You)'}
                  </td>
                  <td className="px-3 py-3 capitalize">
                    {row.colour ? (
                       <span className="inline-block px-2 py-0.5 rounded text-xs border border-gray-200" style={{ backgroundColor: row.colour === 'white' ? '#fff' : row.colour + '20', borderColor: row.colour === 'white' ? '#ddd' : 'transparent' }}>
                         {row.colour}
                       </span>
                    ) : '-'}
                  </td>
                  <td className="px-3 py-3 capitalize">{row.adjective || '-'}</td>
                  <td className="px-3 py-3">
                    {row.isDone ? (
                      <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full">
                        Ready
                      </span>
                    ) : (
                      <span className="text-gray-400 italic text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};