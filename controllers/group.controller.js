import Group from '../models/group.model.js';
import Saving from '../models/saving.model.js';
import Joi from 'joi';
import config from '../config/config.js';

const create = async (req, res) => {
  const { name, description, fixedAmount, maximumCapacity, searchable } = req.body;
  // use Joi to validate the request body
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    fixedAmount: Joi.number().required(),
    maximumCapacity: Joi.number().required(),
    searchable: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // check if group name already exists
  const groupExist = await Group.findOne({ name });
  if (groupExist) {
    return res.status(400).json({
      message: 'Group name already exists',
    });
  }
  const admin = req.user._id;
  // check if admin already has a group
  const adminHasGroup = await Group.findOne({ admin });
  if (adminHasGroup) {
    return res.status(400).json({
      message: 'Admin already has a group',
    });
  }
  const group = await Group.create({ name, description, fixedAmount, maximumCapacity, searchable, admin, members: [admin], collectionList: [admin] });
  // update group with group link using the group id
  const groupLink = `${config.baseUrl}/group/accept/${group._id}`;
  await Group.findByIdAndUpdate(group._id, { groupLink });
  res.status(201).json({ message: 'group created successfully', data: group });
}

export const getGroup = async (req, res) => {
  // get group information as group admin
  let group = await Group.findOne({ admin: req.user._id });
  if (!group) {
    return res.status(404).json({
      message: 'No Group found',
    });
  }
  // populate with admin information and members information exclude password.
  group = await group.populate('admin members', '-password');
  // populate savings of members where member._id is equal to user._id and group._id is equal to group._id from Saving model
  let memberSavings = [];
  await Promise.all(
    group.members.map(async (member) => {
      const savings = await Saving.find({ user: member._id, group: group._id });
      // sum all savings of member
      if(savings.length > 0) {
        const totalSaving = savings.reduce((acc, curr) => acc + curr.amount, 0);
        memberSavings.push({'firstName': member.firstName, 'lastName': member.lastName, amount: totalSaving});
      } else {
        memberSavings.push({'firstName': member.firstName, 'lastName': member.lastName, amount: 0});
      }
    })
  );
  res.status(200).json({ message: 'Group found', data: {...group.toObject(), memberSavings} });
}

export const searchGroup = async (req, res) => {
  const { name } = req.query;
  const groups = await Group.find({
    searchable: true,
    name: {$regex : name , $options : "i"}
  });
  return res.status(201).json({ message: 'success', data: groups });
}

export const joinGroup = async (req, res) => {
  const { name } = req.body;
  const group = await Group.findOne({ name });
  if (!group) {
    return res.status(400).json({
      message: 'Group does not exist',
    });
  }

  const { members } = group;
  const isMember = members.find(member => member.toString() === req.user._id.toString());
  if (isMember) {
    return res.status(400).json({
      message: 'You are already a member of this group',
    });
  }
  // check if the number of members has reached the maximum capacity
  if (members.length >= group.maximumCapacity) {
    return res.status(400).json({
      message: 'Group is full',
    });
  }
  const { _id } = req.user;
  // add as group member
  const groupMember = await Group.findOneAndUpdate({ _id: group._id }, { $push: { members: _id }, $push: { collectionList: _id } }, { new: true });
  // return success
  return res.status(201).json({ message: 'success', data: groupMember });
}

export const joinGroupViaLink = async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    return res.status(400).json({
      message: 'Group does not exist',
    });
  }
  const { members } = group;
  const isMember = members.find(member => member.toString() === req.user._id.toString());
  if (isMember) {
    return res.status(400).json({
      message: 'You are already a member of this group',
    });
  }
  // check if the number of members has reached the maximum capacity
  if (members.length >= group.maximumCapacity) {
    return res.status(400).json({
      message: 'Group is full',
    });
  }
  const { _id } = req.user;
  // add as group member
  const groupMember = await Group.findOneAndUpdate({ _id: group._id }, { $push: { members: _id }, $push: { collectionList: _id } }, { new: true });
  // return success
  return res.status(201).json({ message: 'success', data: groupMember });
}

// add fixed amount for each member of a group to the Saving model
export const addFixedAmount = async () => {
  const groups = await Group.find({});
  await Promise.all(
    groups.map(async (group) => {
      const { members } = group;
      await Promise.all(
        members.map(async (member) => {
          const saving = await Saving.create({ user: member._id, group: group._id, amount: group.fixedAmount });
          return saving;
        })
      );
    })
  );
}

// shuffle the collectionList of a group by random
export const shuffleCollectionList = async () => {
  const groups = await Group.find({});
  await Promise.all(
    groups.map(async (group) => {
      const { collectionList } = group;
      const shuffledCollectionList = await shuffle(collectionList);
      await Group.findByIdAndUpdate(group._id, { collectionList: shuffledCollectionList });
    })
  );
}

export default  create;