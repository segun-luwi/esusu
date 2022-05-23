import mongoose from 'mongoose';

const { Schema } = mongoose;

const SavingSchema = new Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);


const Saving = mongoose.model('Saving', SavingSchema, );

export default Saving;