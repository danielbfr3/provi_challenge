import mongoose, { Schema } from 'mongoose';

const RegistrationTypeSchema = new mongoose.Schema(
  {
    endpoints_order: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('RegistrationType', RegistrationTypeSchema);
