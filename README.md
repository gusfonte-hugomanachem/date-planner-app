# Date Flow (date planner app)

## Description

A collaborative date planner app for all your date planning needs!
Whether it be a romantic, casual or formal plan, Date Flow allows users to go as in-depth as needed, creating multiple activities, nested checklists, or keeping your plan a little more vague as you hammer out the details.

## Keywords/ideas

- plan dates
- activities to do
- places to visit
- post photos
- time (day/month)
- calendar planning

### - planning phase
- title: Zoo date
- date: time, day, month
- activities: ….
- to do list for resources: ….

### - after date
- post photos
- feedback on the date

### - Components

- Date (CRUD)
    - 1 Title : string (required)
    - 1 Description : string (optional)
    - 1 Time : date (optional)
    - 1 Place : string (optional)
    - X Steps : React Component

- Steps (CRUD)
    - 1 Title : string (required)
    - 1 Description : string (optional)
    - 1 Time : date (optional)
    - 1 Place : string (optional)
    - 1 Checklist : string (optional)

### Main features

- Date
    - See all the Dates on a single Page
        - C - - > Add Date Page
        - R - - > Date List Page
        - U - - > Date Details Page
        - D - - > Date List Page

- Steps
    - See all the related Activities
        - C - - > Add Activity Page
        - R - - > Date List Page
        - U - - > Date Details Page
        - D - - > Date Details Page


## Changes

### Day: 16/11 (start)

- [x] basic app setup
- [x] basic server setup
- [x] implement routing
- [x] server deployment
- [x] added pages: Homepage, DateList, AddDateForm
- [x] added components: Navbar
- [x] basic css

- Fixes:
    - [ ] api resets periodically (don't know why)

## didn't have pacience to change

### - MVP:

CRUD Date

Pages : 
- Home Page : Information page
- Dates Page : Display all the created Date
- ->Create Date : Add Date Page (form)
- Date Details Page : U D 

Post-MVP : 
- Search bar
- Activities component
- Time -> Interval ? (e.g weekend at Paris from YY/MM/AAAA to YY/MM/AAAA)

---
(what is this)

- [ ] GitHub initialization
- [ ] Repo 
- [ ]
- [ ]
---

### - Example
UC : plan a date to a zoo

1. Go to app
2. Create a Date
    - Add the title (required)
    - Add a time (optional)
    - Add the place (required)
    - CREATED -> Date Details Page
3. Add a Activity/Steps
    - Add the title (required)
    - Add a checklist (optional)
    - Add a time (optional)
    - Add a description (optional)

UC : See a finished date

1. Go to app
2. See all the date
3. Click on one
    - We see:
        - Title/Time/Description about the Data
        - Title of the activities (+ an option to display all the details)
5. Click somewhere to add (Feedback text + photos)


## API BACKUP

### Google Calendar API: https://developers.google.com/calendar/api/guides/overview

```
[
    {
        "title": "zoo date",
        "time": "10-12-23",
        "place": "Paris zoo",
        "description": "Go to zoo, feed animals",
        "id": 1
    },
    {
        "title": "picnic date",
        "time": "16-12-23",
        "place": "Paris park",
        "description": "Go to park, have picnic",
        "id": 2
    },
    {
        "title": "cinema date",
        "time": "04-12-23",
        "place": "Paris cinema",
        "description": "Go to cinema, watch movie, eat popcorn",
        "id": 3
    }
]

```

### PS: api change to the starting point again while i was doing css