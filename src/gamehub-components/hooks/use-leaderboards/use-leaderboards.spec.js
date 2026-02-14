vi.mock('./use-submit-score.js', () => ({
  useSubmitScoreMutation: vi.fn(() => ({
    submitScore: vi.fn(() => Promise.resolve()), // Mock a successful submission
    loading: false,
    error: undefined,
  })),
}));

describe.skip('useLeaderboards', () => {
  // TODO: All tests in this suite were deleted due to issues
});