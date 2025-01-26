# Steve the destressing bunny
Project for SwampHacks X

## Inspiration
Our team was inspired by the rising conversations of stress in health, our personal lives, and using facial recognition to detect certain emotions from ones face.

## What it does
This webapp tracks the users stress levels while the window is open. when the user surpasses a certain threshold of stress, Steve the bunny notifies the user and provides methods of relieving stress.

## How we built it
Our team used next.js as our front end tool and fastapi as our backend tool. additionally, we used MediaPipe for facial recognition and MediaDevices API to capture the users face.

## Challenges we ran into
One of the bigger problems our team ran into was dealing with merge conflicts. At first our team did not communicate on when we pushed and pulled into our repo and ran into situations where multiple team members were working on one file.

## Accomplishments that we're proud of
Our webapp has a design made to work with a variety of desktops and is visually pleasing. Our team also were able to provide multiple ways of de-stressing to the end user. We were also able to incorporate accurate facial recognition that has a toggle-able treshold

## What we learned
Our team learned a lot about next.js and fastapi as our team has not has any major experience in either technology. Additionally, our team explored topics of facial recognition,  features of stress, the relation between healthcare and stress, methods of reducing stress, and UX/figma

## What's next for Steve the destresing bunny
Our team would like to deploy the webapp online so it can be ran without any installation/setup. We have also considered using PWA so Steve can be used as a desktop app. Additional options and user customization have also been a stretch goal for our team

### Project Setup
1. Create a virtual environment:
`python -m venv venv`

2. Activate the environment:
- **Windows**: `venv\Scripts\activate`
- **macOS/Linux**: `source venv/bin/activate`

3. Install dependencies:
   1. From the backend folder, run:
   `pip install -r requirements.txt`
   2. From the stress-app folder, run:
   `npm install`

### Starting server
1. In the backend folder, run:
`fastapi dev main.py`

2. In the stress-app folder, run:
`npm run dev`
