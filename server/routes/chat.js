import express from "express";
import Chat from "../models/Chat.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Get user chats
router.get(
  "/",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const chats =
        await Chat.find({
          userId:
            req.user,
        });

      res.json(chats);
    } catch (
      error
    ) {
      res.status(500).json(
        {
          message:
            "Server Error",
        }
      );
    }
  }
);

// Save chats
router.post(
  "/save",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const {
        chats,
      } = req.body;

      await Chat.deleteMany(
        {
          userId:
            req.user,
        }
      );

      const savedChats =
        await Promise.all(
          chats.map(
            (
              chat
            ) =>
              Chat.create(
                {
                  userId:
                    req.user,
                  title:
                    chat.title,
                  messages:
                    chat.messages,
                }
              )
          )
        );

      res.json(
        savedChats
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(500).json(
        {
          message:
            "Server Error",
        }
      );
    }
  }
);

export default router;