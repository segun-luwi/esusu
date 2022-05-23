import mongoose from 'mongoose';

const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maximumCapacity: {
      type: Number,
      required: true,
    },
    fixedAmount: {
      type: Number,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    searchable: {
      type: Boolean,
      required: true,
    },
    groupLink: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    collectionList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  { timestamps: true }
);


const Group = mongoose.model('Group', GroupSchema, );

export default Group;