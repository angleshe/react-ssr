export const dva = {
  config: {
    onError(err: ErrorEvent): void {
      err.preventDefault();
      console.error(err.message);
    }
  }
};
