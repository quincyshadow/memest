# Create POSTGREDB 'users' on 'localhost'

# npm run db
# npm run start
# localhost:8000/

# Q2 Assessment | Doctors APPoinment

![wireframe](https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C08560e886482841ca5eeb4016c513974/projects/D6c1d37a72a6efd2eb3491d05a8241d10/pages/1a1d6cd7e50f4e889ca2fcabb0554311/image/1a1d6cd7e50f4e889ca2fcabb0554311.png)


Move deliberately and methodically through the stories provided below.

__Stay calm and code on!__

## Assessment Overview

**Doctors APPointment** is an app where a user can schedule an appointment with a doctor without logging in or registering. The doctor can then log in and view all of their appointments. The Doctor should be able to READ, UPDATE, & DELETE appointments.

Your schema should be built using `migrations`.

In order to submit it please **fork & clone** this repository and slack it the finished version to your instructor before the allocated time frame completes.


# Use the following User stories to guide your development:
__You should git add, commit, and push after each story is completed__

*NOTE* - Please note that all the routes listed below (ex `/appointments/confirmed`) are just suggestions and you can structure your routes however you would like.

### Appointment Creation

~~__#1__
```
As a user
When I go to the root route
I see a list of doctors available.
```

~~__#2__
```
As a User
When I click on a doctors 'Book' link
I am redirected to /book/:doctor_id .
```

__#3__
```
As a User
When I visit /book/:doctor_id
I see a form for creating a new appointment.
```

__#4__
```
As a User
When I submit the form for creating a new appointment
I am redirected to the root route.
```

### Doctor Login / Registration

__#1__
```
As a Doctor
When I visit /doctors/login
I see a form to register.
```

__#2__
```
As a Doctor
When I submit the form to register
I am redirected back to the login page.
```

__#3__
```
As a Doctor
When I visit /doctors/login
I see a form to login (along with the register form, see wireframe).
```

__#4__
```
As a Doctor
If I enter invalid credentials into the login form & submit
I am redirected back to the login page.
```
__#5__
```
As a Doctor
If I enter valid credentials into the login form & submit
I am redirected to /appointments
```

__#6__
```
As a Doctor
If I am not logged in and try to visit /appointments (or any route that stems from it)
I am redirected to /doctors/login
```


### Appointments View

__#1__
```
As a Doctor
When I visit /appointments
I should see three links (confirmed appointments, unconfirmed appointments, and completed appointments).
```

__#2__
```
As a Doctor
When I click the "unconfirmed appointments" link
I should be redirected to /appointments/unconfirmed.
```

__#3__
```
As a Doctor
When I click the "completed appointments" link
I should be redirected to /appointments/completed.
```

__#4__
```
As a Doctor
When I click the "confirmed appointments" link
I should be redirected to /appointments (the default display for /appointments will show confirmed appointments).
```

__#5__
```
As a Doctor
When I visit /appointments
I see a list of all confirmed appointments.
```

__#6__
```
As a Doctor
When I visit /appointments/unconfirmed
I see a list of all unconfirmed appointments.
```

__#7__
```
As a Doctor
When I visit /appointments/completed
I see a list of all completed appointments.
```


### Appointment Page

__#1__
```
As a Doctor
When I click on the "view" button for an appointment
I am redirected to /appointments/view/:id .
```

__#2__
```
As a Doctor
When I visit /appointments/view/:id
I should see the information about the appointment.
```

__#3__
```
As a Doctor
When I visit /appointments/view/:id & the appointment is unconfirmed
I should see a "Confirm Appointment" button.
```

__#4__
```
As a Doctor
When I click the "Confirm Appointment" button
Then the appointment should be changed from 'unconfirmed' to 'confirmed',
I should also be redirected back to /appointments
```

__#5__
```
As a Doctor
When I visit /appointments/view/:id & the appointment is confirmed
I should see a "Mark as Completed" button.
```

__#6__
```
As a Doctor
When I click the "Mark as Completed" button
Then the appointment should be changed from 'confirmed' to 'completed',
I should also be redirected back to /appointments
```

__#7__
```
As a Doctor
When I visit /appointments/view/:id & the appointment is completed
I should see a "Delete Appointment" button.
```

__#8__
```
As a Doctor
When I click the "Delete Appointment" button
Then the appointment should be deleted,
I should also be redirected back to /appointments
```

__#9__
```
As a Doctor
When I visit /appointments/view/:id
I should see a link to edit the appointment.
```

__#10__
```
As a Doctor
When I click the edit link on the appointments page
I should be redirected to /appointments/edit/:id.
```

__#10__
```
As a Doctor
When I visit /appointments/edit/:id
I should see a form to edit the appointment (with all of the values pre-populated)
```

__#11__
```
As a Doctor
When I submit the form to edit an appointment
It should redirect me back to the appointments view page (/appointments/view/:id) & the information should be correctly updated
```

### Notes
__#1__
```
As a Doctor
When I visit /appointments/view/:id
I should see a list of all notes left on the appointment.
```

__#2__
```
As a Doctor
When I visit /appointments/view/:id
I should see a form for entering a new note.
```

__#3__
```
As a Doctor
When I submit the form for a new note
I should see my new note on the appointment page.
```
