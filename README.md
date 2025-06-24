# TaskTrackr - Simple Task Management App

A modern task management application built with Next.js, featuring both a web interface and CLI tool.

## Features

### Web Application
- ✅ Create, read, update, and delete tasks
- 📊 Task statistics dashboard
- 🎯 Filter tasks by status (All, Pending, In Progress, Completed)
- 📱 Responsive design with DaisyUI components
- 💾 File-based JSON storage (no database required)
- ⚡ Real-time updates

### CLI Application
- 📝 Command-line task management
- 🔧 Simple Node.js implementation
- 💾 JSON file storage
- 🚀 Easy to use commands

## Project Structure

```
task-traker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── tasks/         # Task API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── cli/                   # CLI application
│   ├── app.js            # CLI main file
│   ├── package.json      # CLI dependencies
│   └── tasks.json        # CLI task storage
├── components/            # React components
│   ├── TaskCard.tsx      # Individual task card
│   └── AddTaskModal.tsx  # Add task modal
├── data/                 # Data storage
│   └── tasks.json        # Web app task storage
├── types/                # TypeScript definitions
│   └── task.ts           # Task interface
└── README.md             # This file
```

## Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Storage**: JSON file-based storage
- **UI Components**: React with TypeScript
- **ID Generation**: UUID v4
- **CLI**: Node.js

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-traker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Web Application

#### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in the task title and description
3. Click "Add Task" to create

#### Managing Tasks
- **View Tasks**: Tasks are displayed in a card grid layout
- **Filter Tasks**: Use the tabs to filter by status (All, Pending, In Progress, Completed)
- **Update Status**: Use the dropdown in each task card to change status
- **Delete Tasks**: Click the menu button (⋮) on a task card and select "Delete Task"
- **View Statistics**: The dashboard shows counts for each status category

### CLI Application

Navigate to the CLI directory:
```bash
cd cli
```

#### Available Commands

**Add a new task:**
```bash
node app.js add "Buy milk" "Buy from local store"
```

**List all tasks:**
```bash
node app.js list
```

**Delete a task:**
```bash
node app.js delete <task-id>
```

**Update a task:**
```bash
node app.js update <task-id> "New title" "New description" "In Progress"
```

**Show help:**
```bash
node app.js help
```

#### CLI Examples

```bash
# Add tasks
node app.js add "Learn React" "Complete React tutorial"
node app.js add "Build API" "Create REST API with Express"

# List all tasks
node app.js list

# Update task status
node app.js update abc123 "" "" "Completed"

# Delete a task
node app.js delete abc123
```

## API Endpoints

The web application uses the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/[id]` - Update a specific task
- `DELETE /api/tasks/[id]` - Delete a specific task

## Task Structure

Each task has the following properties:

```typescript
interface Task {
  id: string;              // Unique identifier (UUID)
  title: string;           // Task title
  description: string;     // Task description
  status: 'Pending' | 'In Progress' | 'Completed';  // Task status
  timestamp: string;       // Creation timestamp (ISO string)
  createdAt: string;       // Creation date (ISO string)
  updatedAt: string;       // Last update date (ISO string)
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
