import mongoose, { Schema } from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    registration_type: {
      type: Schema.Types.ObjectId,
      ref: 'RegistrationType',
    },
    steps_done: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Registration', RegistrationSchema);
