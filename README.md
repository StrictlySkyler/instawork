# Instawork Team Member App
This is a simple app for managing team members, as described in the spec included in this repo ([PDF](https://github.com/StrictlySkyler/instawork/blob/main/Full-stack%20take-home%20assignment%20.pdf)).

## Setup
This app was built and tested using:
- Python 3.11.9
- pip 24.0
- Node 20.15.0
- Django 5.1.4
- React 18.3.1
- Cypress 13.16.1

### To install the app's dependencies:
1. `pip install -r requirements.txt` from within `backend/`
2. `npm i` from within `frontend/`
3. To run the user journey tests, you'll need to meet [Cypress' system requirements](https://docs.cypress.io/app/get-started/install-cypress#System-requirements)

### To run the app(s):
1. `python manage.py runserver` from within `backend/`
2. `npm start` from within `frontend/`
3. Visit `http://localhost:3000` in a browser
4. **Login Credentials:**
    * Username: `example@instawork.com` or `testing@instawork.com` (admin)
    * Password: `password` 

### To test the apps(s):
1. `python manage.py test --keep` from within `backend/`
2. `npm test` from within `frontend/` for headless, `npm run test:watch` to observe

## Assumptions
1. Creating, deleting, promoting admins & restricted access strongly implies login capability
2. Django Admin's default User model covers most of the requirements covered in the spec but has different fields; probable candidate for subclassing
3. Only an Admin user should be able to delete/alter another user's Admin state (a non-admin should not be able to set all admins to no longer be admins)
4. In a production scenario, the Django app likely leverages gunicorn and sits behind a reverse proxy (nginx, haproxy, etc.), while the React app lives in a CDN bucket.
5. Time is money and the scope is fixed, so don't do any "gold plating"

## Next Steps
There is always more to do.  While the code in this app is very simple, it could benefit from both integration and component tests in a production scenario; model instantiation and field validation as well as isolated component rendering come to mind as good places to start.  And it's always ~~hair-raising~~ enjoyable to add a code coverage metric.

## Time spent
~9hrs with tests, interspersed by meetings, kids, dinner, and #dadlife:
1. Design & thinking ~(like a long-running cron)
2. Setup & Scaffolding 30min ([`44beeae`](https://github.com/StrictlySkyler/instawork/commit/44beeae944590160e474ab1e366827ea1cacceba))
3. Routing 30min ([`015fd84`](https://github.com/StrictlySkyler/instawork/commit/015fd84caae1d5e6fbcaed3c8496287442475d53))
4. Login backend functionality 1hr ([`e27e595`](https://github.com/StrictlySkyler/instawork/commit/e27e59501ed24f7ba27d8c98583df22b7bb1fa05))
5. Login frontend functionality 30min ([`6f64933`](https://github.com/StrictlySkyler/instawork/commit/6f64933ca713567120152d45803e198f36ca215e))
6. List, Add, Edit page forms, & Styling 90min ([`bc73459`](https://github.com/StrictlySkyler/instawork/commit/bc734596a1c45604aa22535f8590f47b4368732d))
7. Add/Edit member functionality & validation 1hr ([`d94b763`](https://github.com/StrictlySkyler/instawork/commit/d94b7630d762c8269df0516b2aa8f9fe1330f37e))
8. Delete member functionality & validation 30min ([`96ba7ff`](https://github.com/StrictlySkyler/instawork/commit/96ba7ff577d68b35953a0566fcfc1cd5e4f8c7f7))
9. Frontend validation 30min ([`276c924`](https://github.com/StrictlySkyler/instawork/commit/276c92433f3691cce06ae639f931bd601e3f94dc))
10. Tests 2hrs ([`05e4dbd`](https://github.com/StrictlySkyler/instawork/commit/05e4dbd6d1fc11968fede9a250f28dbadf2ee7c8))
11. Bugs & defects 1hr (`6d86e2e`)

In other words, a single very productive day's worth of work, or about the length of a weekend project.  This was fun to build.

TODO:
1. ~~Design & Thinking~~
2. ~~Scaffolding~~
3. ~~Routing~~
4. ~~List, Add, Edit Page forms~~
5. ~~Add member functionality~~
6. ~~Delete member~~
7. ~~Frontend validation~~
8. ~~Backend validation~~
9. ~~Login~~
10. ~~Styling~~
11. ~~Tests~~
