import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["Owner", "Admin", "Member"], default: "Member" },
  },
  { _id: false }
);

const invitationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true }, // invited user email
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Declined"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [teamMemberSchema],
    invitations: [invitationSchema],
  },
  { timestamps: true }
);

export const TeamModel = mongoose.model("Team", teamSchema);




// ------------------------------------------------------------------------


/**
 * 

[Owner/Admin] 
   |
   v
[Send Invitation]
 - Add user's email to team.invitations
 - Status = Pending
 - Send email/notification
   |
   v
[Invited User]
 - Receives invitation
 - Accepts or Declines
 - If accepted → Added to team.members as Member
   |
   v
[Team Dashboard]
 - Members can view metrics & monitoring
 - Only Admins/Owner can invite/manage
 * 
 */