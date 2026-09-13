const MemberTable = ({
  members,
  onEdit,
  onDelete,
}) => {
  if (members.length === 0) {
    return (
      <div className="empty-state">
        <h3>No members added yet</h3>
        <p>Add your first trip member above.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member, index) => (
            <tr key={member._id}>
              <td>{index + 1}</td>

              <td className="member-name">
                {member.name}
              </td>

              <td>₹{member.amount}</td>

              <td>
                <span
                  className={
                    member.paymentStatus === "Paid"
                      ? "status paid"
                      : "status pending"
                  }
                >
                  {member.paymentStatus}
                </span>
              </td>

              <td>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(member)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(member._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;