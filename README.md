
# DueTell

> Because your syllabus should actually tell you what's due.

DueTell is a React and TypeScript web application that helps students turn
long course syllabi into organized, actionable course information.

## Why I Built It

Before development, I surveyed college students about how they use their
syllabi and the information they have the most difficulty finding.

I used those results to prioritize the first development sprint around
the features students requested most, including:

- Important dates and assignments
- Grading breakdowns
- Course policies
- Easier access to key syllabus information

## Current Prototype

DueTell currently allows students to:

- Upload multi-page PDF syllabi
- Extract syllabus text using PDF.js
- Organize extracted information into useful categories
- Identify important dates and assignments
- Surface grading information
- Surface important course policies
- View the original extracted text

The project is currently in its first development sprint.

## Tech Stack

- React
- TypeScript
- PDF.js
- Vite
- CSS
- Git/GitHub

## Technical Challenges

### PDF Processing

One of the first challenges was getting different PDF files to process
consistently.

I traced issues through the upload flow, fixed how files were being handled,
and reorganized the extraction logic to make PDF processing more reliable.

### Organizing Unstructured Text

PDF extraction initially produced large blocks of unstructured text.

I added processing logic that breaks extracted text into smaller sections
and identifies information related to deadlines, grading, and course
policies so the results are easier for students to navigate.

## Roadmap

DueTell is actively being developed. Planned features include:

- Student dashboard
- Improved syllabus analysis
- Course management
- Deadline and assignment tracking
- Calendar functionality
- Additional insights based on student user research
- Deployment and user testing

## Project Status

🚧 **In Development — First Sprint**

This repository contains a working prototype. Features and architecture
will continue to change as I test and iterate on the product.

Video Demo working prototype [https://drive.google.com/file/d/1nRhpbHFicSHUWFYKWYy9BsLAMwOhZPkL/view?usp=sharing]
```
