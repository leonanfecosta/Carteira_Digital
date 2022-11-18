module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'transactions',
      [
        {
          debited_account_id: 1,
          credited_account_id: 2,
          value: 500,
          created_at: new Date(),
        },
        {
          debited_account_id: 2,
          credited_account_id: 1,
          value: 100,
          created_at: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  }, 
};