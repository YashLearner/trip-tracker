import Member from "../model/Member.js";

// Add member
export const addMember = async (req, res) => {
  try {
    const { name, amount, paymentStatus } = req.body;

    if (!name || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and amount are required",
      });
    }

    const member = await Member.create({
      name,
      amount,
      paymentStatus: paymentStatus || "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    const totalMembers = members.length;

    const totalAmount = members.reduce(
      (total, member) => total + member.amount,
      0
    );

    const totalPaid = members
      .filter((member) => member.paymentStatus === "Paid")
      .reduce((total, member) => total + member.amount, 0);

    const totalPending = members
      .filter((member) => member.paymentStatus === "Pending")
      .reduce((total, member) => total + member.amount, 0);

    res.status(200).json({
      success: true,
      data: members,
      summary: {
        totalMembers,
        totalAmount,
        totalPaid,
        totalPending,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update member
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, paymentStatus } = req.body;

    const member = await Member.findByIdAndUpdate(
      id,
      {
        name,
        amount,
        paymentStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete member
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

