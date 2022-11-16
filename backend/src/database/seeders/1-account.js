module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        balance: 1000,
      },
      {
        balance: 500,
      },
    ], {});
  },
  
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};