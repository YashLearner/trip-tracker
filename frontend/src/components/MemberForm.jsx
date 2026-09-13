import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  amount: "",
  paymentStatus: "Pending",
};

const MemberForm = ({
  editingMember,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name,
        amount: editingMember.amount,
        paymentStatus: editingMember.paymentStatus,
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.amount) {
      return;
    }

    await onSubmit({
      name: formData.name.trim(),
      amount: Number(formData.amount),
      paymentStatus: formData.paymentStatus,
    });

    setFormData(initialForm);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter member name"
        />
      </div>

      <div className="form-group">
        <label>Amount</label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Payment Status</label>

        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingMember ? "Update Member" : "Add Member"}
        </button>

        {editingMember && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MemberForm;