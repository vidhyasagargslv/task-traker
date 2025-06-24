#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Ensure tasks file exists
if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify([], null, 2));
}

function readTasks() {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(title, description) {
  const tasks = readTasks();
  const now = new Date().toISOString();
  
  const newTask = {
    id: uuidv4(),
    title,
    description,
    status: 'Pending',
    timestamp: now,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);
  
  console.log('✅ Task added successfully!');
  console.log(`ID: ${newTask.id}`);
  console.log(`Title: ${newTask.title}`);
  console.log(`Description: ${newTask.description}`);
  console.log(`Status: ${newTask.status}`);
}

function listTasks() {
  const tasks = readTasks();
  
  if (tasks.length === 0) {
    console.log('📝 No tasks found.');
    return;
  }

  console.log(`\n📋 Found ${tasks.length} tasks:\n`);
  
  tasks.forEach((task, index) => {
    const statusEmoji = {
      'Pending': '⏳',
      'In Progress': '🔄',
      'Completed': '✅'
    }[task.status] || '❓';

    console.log(`${index + 1}. ${statusEmoji} ${task.title}`);
    console.log(`   ID: ${task.id}`);
    console.log(`   Description: ${task.description}`);
    console.log(`   Status: ${task.status}`);
    console.log(`   Created: ${new Date(task.createdAt).toLocaleString()}`);
    console.log('');
  });
}

function deleteTask(id) {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    console.log('❌ Task not found.');
    return;
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  writeTasks(tasks);
  
  console.log('🗑️  Task deleted successfully!');
  console.log(`Title: ${deletedTask.title}`);
}

function updateTask(id, title, description, status) {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    console.log('❌ Task not found.');
    return;
  }

  const task = tasks[taskIndex];
  
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) {
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (validStatuses.includes(status)) {
      task.status = status;
    } else {
      console.log('❌ Invalid status. Use: Pending, In Progress, or Completed');
      return;
    }
  }
  
  task.updatedAt = new Date().toISOString();
  
  writeTasks(tasks);
  
  console.log('✏️  Task updated successfully!');
  console.log(`ID: ${task.id}`);
  console.log(`Title: ${task.title}`);
  console.log(`Description: ${task.description}`);
  console.log(`Status: ${task.status}`);
}

function showHelp() {
  console.log(`
🎯 TaskTrackr CLI - Simple Task Management

Usage:
  node app.js <command> [arguments]

Commands:
  add <title> <description>           Add a new task
  list                               List all tasks
  delete <id>                        Delete a task by ID
  update <id> [title] [desc] [status] Update a task
  help                               Show this help message

Examples:
  node app.js add "Buy milk" "Buy from local store"
  node app.js list
  node app.js delete abc123
  node app.js update abc123 "Buy organic milk" "Buy from Whole Foods" "In Progress"

Status Options: Pending, In Progress, Completed
`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    if (args.length < 3) {
      console.log('❌ Missing arguments. Usage: node app.js add <title> <description>');
    } else {
      addTask(args[1], args[2]);
    }
    break;

  case 'list':
    listTasks();
    break;

  case 'delete':
    if (args.length < 2) {
      console.log('❌ Missing task ID. Usage: node app.js delete <id>');
    } else {
      deleteTask(args[1]);
    }
    break;

  case 'update':
    if (args.length < 2) {
      console.log('❌ Missing task ID. Usage: node app.js update <id> [title] [description] [status]');
    } else {
      updateTask(args[1], args[2], args[3], args[4]);
    }
    break;

  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;

  default:
    console.log('❌ Unknown command. Use "help" to see available commands.');
    showHelp();
}
