// Cleanly wraps actions
const actionWrapper = ({ type }: { type: string }) => {
  return {
    init: () => ({
      type,
      status: 100,
      message: 'Init'
    }),
    packData: data => ({
      type,
      status: 200,
      message: 'Success',
      ...data
    }),
    packError: error => ({
      type,
      status: error.status || 400,
      message: error.message || 'Unspecified error'
    })
  };
};

export { actionWrapper };
