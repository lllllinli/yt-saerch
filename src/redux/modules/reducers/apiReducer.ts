export const apiReducer = (state: any = 0, action: any) => {
  switch (action.type) {
    case 'loadSuggestionsInProgress':
      console.log('a:', action );
      return state
    
    default:
      return state;
  }
}