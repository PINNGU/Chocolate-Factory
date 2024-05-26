const { readJSONFile, writeJSONFile } = require('../utils/jsonHandler');
const Comment = require('../models/Comment');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const filePath = './data/comments.json';

class CommentService {
  async getAllComments() {
    return await readJSONFile(filePath);
  }

  async getCommentById(id) {
    const comments = await readJSONFile(filePath);
    return comments.find(comment => comment.id === id);
  }

  async createComment(commentData) {
    const comments = await readJSONFile(filePath);
    const newComment = new Comment(
      uuidv4(),
      commentData.customer,
      commentData.factory,
      commentData.text,
      commentData.rating
    );
    comments.push(newComment);
    await writeJSONFile(filePath, comments);
    return newComment;
  }

  async updateComment(id, updatedData) {
    const comments = await readJSONFile(filePath);
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
      throw new Error('Comment not found');
    }
    comments[index] = { ...comments[index], ...updatedData };
    await writeJSONFile(filePath, comments);
    return comments[index];
  }

  async deleteComment(id) {
    const comments = await readJSONFile(filePath);
    const updatedComments = comments.filter(comment => comment.id !== id);
    await writeJSONFile(filePath, updatedComments);
    return { message: 'Comment deleted successfully' };
  }
}

module.exports = new CommentService();