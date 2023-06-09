const getCustomerOrdersApi = () => {
  const response = [
    { id: 1, division: "1", group: "A", name: "谷口颯", drink: "生" },
    { id: 2, division: "1", group: "B", name: "谷口颯２", drink: "生" },
    { id: 3, division: "1", group: "C", name: "谷口颯３", drink: "生" },
    { id: 4, division: "1", group: "D", name: "谷口颯４", drink: "生" },
    { id: 5, division: "1", group: "E", name: "谷口颯５", drink: "生" },
    { id: 6, division: "2", group: "E", name: "石川雄大", drink: "ハイボール" },
    {
      id: 7,
      division: "2",
      group: "A",
      name: "石川雄大２",
      drink: "ハイボール",
    },
    {
      id: 8,
      division: "2",
      group: "B",
      name: "石川雄大３",
      drink: "ハイボール",
    },
    {
      id: 9,
      division: "2",
      group: "C",
      name: "石川雄大４",
      drink: "ハイボール",
    },
    {
      id: 10,
      division: "2",
      group: "D",
      name: "石川雄大５",
      drink: "ハイボール",
    },
  ];

  return response;
};

const api = { getCustomerOrdersApi };

export default api;
