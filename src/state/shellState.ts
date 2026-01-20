// Shell global state

export interface ShellState {
  isGameModeActive: boolean;
  // Additional shell state fields can be added here
}

export const defaultShellState: ShellState = {
  isGameModeActive: false,
};
