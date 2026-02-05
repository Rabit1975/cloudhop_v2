import React, { useState, useEffect } from 'react';
import { GitHubService, ForcedUpdateInfo, GitHubBranch } from '../core/github/GitHubService';

interface ForcedUpdatesPanelProps {
  repoOwner: string;
  repoName: string;
  onClose: () => void;
}

export const ForcedUpdatesPanel: React.FC<ForcedUpdatesPanelProps> = ({
  repoOwner,
  repoName,
  onClose,
}) => {
  const [githubService] = useState(() => new GitHubService(repoOwner, repoName));
  const [forcedUpdates, setForcedUpdates] = useState<ForcedUpdateInfo[]>([]);
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  const checkForcedUpdates = async () => {
    setLoading(true);
    setError(null);

    try {
      if (token) {
        githubService.setToken(token);
      }

      const [updates, allBranches] = await Promise.all([
        githubService.checkForcedUpdates(),
        githubService.getAllBranches(),
      ]);

      setForcedUpdates(updates);
      setBranches(allBranches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check forced updates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkForcedUpdates();
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getShortSha = (sha: string) => {
    return sha.substring(0, 7);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Forced Updates - {repoOwner}/{repoName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Token (optional, for higher rate limits)
            </label>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={checkForcedUpdates}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Checking...' : 'Refresh'}
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Forced Updates Found</h3>
                {forcedUpdates.length === 0 ? (
                  <p className="text-gray-500">No forced updates detected.</p>
                ) : (
                  <div className="space-y-3">
                    {forcedUpdates.map((update, index) => (
                      <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-red-800">{update.branch}</h4>
                          <span className="text-sm text-gray-600">
                            {formatDate(update.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>Force pushed by:</strong> {update.forcePushedBy}
                          </p>
                          <p>
                            <strong>From:</strong> {getShortSha(update.oldSha)} →
                            <strong>To:</strong> {getShortSha(update.newSha)}
                          </p>
                          {update.commitsLost > 0 && (
                            <p className="text-red-600">
                              <strong>⚠️ {update.commitsLost} commits lost</strong>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">All Branches ({branches.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {branches.map(branch => (
                    <div
                      key={branch.name}
                      className={`border rounded-lg p-3 ${
                        branch.protected
                          ? 'border-yellow-300 bg-yellow-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{branch.name}</h4>
                        {branch.protected && (
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                            Protected
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>SHA: {getShortSha(branch.commit.sha)}</p>
                        <p>Author: {branch.commit.author.name}</p>
                        <p>{formatDate(branch.commit.author.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
