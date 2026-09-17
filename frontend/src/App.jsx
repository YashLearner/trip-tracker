import { useEffect, useState } from "react";

import DashboardCards from "./components/DashboardCards";
import MemberForm from "./components/MemberForm";
import MemberTable from "./components/MemberTable";

import { addMember, deleteMember, getMembers, updateMember } from "../src/services/memberApi.js";
const emptySummary = {
  totalMembers: 0,
  totalAmount: 0,
  totalPaid: 0,
  totalPending: 0,
};

const App = () => {
  const [members, setMembers] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await getMembers();

      setMembers(response.data);
      setSummary(response.summary);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (memberData) => {
    try {
      if (editingMember) {
        await updateMember(
          editingMember._id,
          memberData
        );

        setEditingMember(null);
      } else {
        await addMember(memberData);
      }

      await fetchMembers();
    } catch (error) {
      console.error("Failed to save member:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) return;

    try {
      await deleteMember(id);

      await fetchMembers();
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <h1>Trip Tracker</h1>
            <p>
              Manage your trip members and payments
            </p>
          </div>
          <p className="coordinator" tabIndex={0}>
            Coordinator - Drx Pankaj Prajapati
          </p>
        </header>

        <DashboardCards summary={summary} />

        <section className="form-section">
          <h2>
            {editingMember
              ? "Edit Member"
              : "Add Member"}
          </h2>

          <MemberForm
            editingMember={editingMember}
            onSubmit={handleSubmit}
            onCancel={() => setEditingMember(null)}
          />
        </section>

        <section className="members-section">
          <div className="section-header">
            <h2>Trip Members</h2>

            <span>
              {summary.totalMembers} Members
            </span>
          </div>

          {loading ? (
            <div className="loading">
              Loading members...
            </div>
          ) : (
            <MemberTable
              members={members}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;