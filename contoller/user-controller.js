const { User } = require("../models");

module.exports = {
  //1. get all Users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" }, err);
    }
  },
  //2. get specific user
  async getUserId(req, res) {
    try {
      const userData = await User.findById({ _id: req.params.userId }).select(
        "-__v"
      );

      if (userData) {
        res.status(200).json(userData);
      } else {
        res.status(404).json({ message: "Id not found!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" });
    }
  },
  //3. create a user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" });
    }
  },
  //deletes User
  async deleteUser(req, res) {
    try {
      const userData = await User.findByIdAndDelete(req.params.userId);
      !userData
        ? res.status(404).json({ message: "id was not found!" })
        : res.status(200).json({ message: "User id was deleted!" });
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!", err });
    }
  },

  //update user data
  async updateData(req, res) {
    try {
      const updatedData = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      !updatedData
        ? res.status(404).json({ message: "id was not found" })
        : res.status(200).json({ message: "id was found and updated!" });
    } catch (err) {
      res.status(500).json({ message: "Check your server endpoint!" });
    }
  },
  //post new frined (adds friends)
  async postfriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $addToSet: { friends: req.body.friendsId || req.params.friendId },
        },
        { new: true }
      );
      res.status(200).json(friendData);
    } catch (err) {
      res.status(404).json({ message: "Failed to post friend!", err });
    }
  },

  //delete's friends
  async deletefriend({ params }, res) {
    try {
      const deletefriend = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );

      if (deletefriend) {
        res.status(200).json("friend has been removed!");
      } else {
        res.status(404).json("friend id was not found!");
      }
    } catch (err) {
      res.status(500).json({ message: "" });
    }
  },
};
