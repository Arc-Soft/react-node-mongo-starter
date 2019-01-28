export const loadingStates = {
  isLoading: false,
  isLoaded: false,
  hasError: false
};

export const setLoadingStates = newState => ({ ...loadingStates, ...newState });
