import {Request, Response} from 'express';
import prisma from '../db';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const {title, description} = req.body;
  const task = await prisma.task.create({
    data: {title, description}
  });
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, description, completed} = req.body;
  const task = await prisma.task.update({
    where: {id: Number(id)},
    data: {title, description, completed}
  });
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const {id} = req.params;
  await prisma.task.delete({
    where: {id: Number(id)}
  });
  res.status(204).end();
};