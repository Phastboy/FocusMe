# FocusMe

FocusMe is a task management application built with Next.js and MongoDB. It provides users with the ability to create, update, delete, and manage tasks. The application also includes metrics to track task completion, overdue tasks, and tasks closest to their due dates.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, update, delete tasks
- View all tasks
- Task metrics: total tasks, completed tasks, overdue tasks, closest due tasks
- Task status management
- User authentication with Clerk

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Clerk
- **Styling**: Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB instance (local or hosted)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Phastboy/focusme.git
   cd focusme
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
DB_URL=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
