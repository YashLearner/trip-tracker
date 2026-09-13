const DashboardCards = ({ summary }) => {
  const cards = [
    {
      title: "Total Members",
      value: summary.totalMembers,
    },
    {
      title: "Total Amount",
      value: `₹${summary.totalAmount}`,
    },
    {
      title: "Total Paid",
      value: `₹${summary.totalPaid}`,
    },
    {
      title: "Total Pending",
      value: `₹${summary.totalPending}`,
    },
  ];

  return (
    <div className="dashboard-grid">
      {cards.map((card) => (
        <div className="dashboard-card" key={card.title}>
          <p>{card.title}</p>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
