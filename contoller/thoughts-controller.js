const { Thought } = require("../models");

module.exports = {
  //get all user thought from thoughts database
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      !thoughtData
        ? res.status(404).json({ message: "Couldnt get all Thoughts" })
        : res.status(202).json(thoughtData);
    } catch (err) {
      res.status(500).json({ messae: "Check server endpoint!" });
    }
  },
  //Get thougth with specific id
  async getUserThought(req, res) {
    try {
      const userThought = await Thought.findOne({ _id: req.params.thoughtId });
      if (userThought) {
        res.status(200).json(userThought);
      } else {
        res.status(404).json({ message: "No id that matches that thought" });
      }
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!", err });
    }
  },
  //post a thoughtText
  async postThought(req, res) {
    try {
      const post = await Thought.create(req.body);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!", err });
    }
  },
  //update ThoughtText
  async postupdate(req, res) {
    try {
      const postUpdate = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (postUpdate) {
        res.status(200).json(postUpdate);
      } else {
        res.status(404).json({ message: "Thought id was not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" });
    }
  },
  async deletethought(req, res) {
    try {
      const deletethought = await Thought.findByIdAndDelete({
        _id: req.params.thoughtId,
      });
      !deletethought
        ? res.status(404).json({ message: "thought id was not found!" })
        : res.status(200).json({ message: "Thought id was deleted!" });
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" });
    }
  },
  async postReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      !reaction
        ? res
            .status(404)
            .json({ message: "Reaction was successfully check endpoint!" })
        : res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" });
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      !reaction
        ? res
            .status(404)
            .json({ message: "id was not found! Could not delete" })
        : res.status(200).json({ message: "Reaction was deleted!" });
    } catch (err) {
      res.status(500).json({ message: "Check server endpoint!" });
    }
  },
};
