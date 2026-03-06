# Learning Platform (Teacher / Student)

A small educational platform where teachers can create lessons, assign tasks, and invite students.  
Students receive invitations, join lessons, and submit solutions for tasks.

The project is built as a modern React/Next.js application with Supabase as the backend.

---

# Overview

This application allows teachers to manage lessons and tasks while students can join lessons and submit their work.

Main idea of the system:

Teacher
- creates lessons
- creates tasks inside lessons
- invites students
- review students tasks

Student
- receives invitation
- joins lesson
- sees assigned tasks
- submits solutions

The goal of the project is to build a simple and clean MVP of a learning platform.

---

# Tech Stack

Frontend
- Next.js (App Router)
- TypeScript
- Zustand (state management)
- TanStack Query (server state)
- ShadCn / UI components
- React Hook Form

Backend
- Supabase
- PostgreSQL
- Row Level Security (RLS)
- Supabase Auth

Other
- Vercel (deployment)
- GitHub (repository)

---

# Features

Authentication
- user registration and login
- role selection (teacher / student)

Lessons
- teachers can create lessons
- lessons store title, description and owner

Invitations
- teacher can invite students via email
- student receives invitation and joins lesson

Students in Lesson
- teacher can see students in a lesson
- students only see their own UI

Tasks
- teacher can create tasks for a lesson
- tasks contain title and description

Task Submissions
- students submit their solutions
- each submission is connected to:
  - task
  - student

Security
- Supabase RLS policies
- students can only see their own submissions
- teachers can see all lesson data

---

# Project Architecture

The project uses a layered architecture:
src
├── app
│ ├── (auth)
│ ├── (dashboard)
│ ├── instruments
│ ├── profile
│ ├── providers
│ ├── layout.tsx
│ └── page.tsx
│
├── components
│ ├── emptyLesson
│ ├── header
│ ├── inviteCard
│ ├── lessonCard
│ ├── profile
│ └── ui
│
├── lib
│ ├── helper
│ ├── services
│ ├── supabase
│ └── utils.ts
│
├── stores
│ ├── invites
│ ├── lessons
│ └── user
│
└── types 
---

# State Management

Client state is handled with:

Zustand

Used for:
- user state
- lessons state
- invites state

Server state is handled with:

TanStack Query

Used for:
- fetching lessons
- fetching tasks
- fetching submissions
- caching API requests

---

# Database (Supabase)

Main tables:

profiles  
application users

lessons  
lessons created by teachers

lesson_invites
recieve invites via email

lesson_students  
relation between lessons and students

tasks  
tasks inside lessons

task_submissions  
student submissions for tasks


Views are used to simplify queries and combine related data.

---

# Deployment

The application is deployed using:

Vercel

---

# Future Improvements

Possible improvements for the project:

- real-time updates
- comments on submissions
- notifications
- file uploads
- lesson analytics

---

# Author

Forelolit
