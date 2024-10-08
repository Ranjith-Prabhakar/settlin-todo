// // import { Meteor } from "meteor/meteor";
// // import { TasksCollection } from "/imports/api/TasksCollection";
// // import { Accounts } from 'meteor/accounts-base';
// // import '../imports/api/TasksPublications'
// // import '../imports/api/tasksMethods'

// // const insertTask = (taskText) =>
// //   TasksCollection.insertAsync({ text: taskText });


// // const SEED_USERNAME = 'meteorite';
// // const SEED_PASSWORD = 'password';

// // Meteor.startup(async () => {

// //   if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
// //     await Accounts.createUser({
// //       username: SEED_USERNAME,
// //       password: SEED_PASSWORD,
// //     });
// //   }

// //   if ((await TasksCollection.find().countAsync()) === 0) {
// //     [
// //       "First Task",
// //       "Second Task",
// //       "Third Task",
// //       "Fourth Task",
// //       "Fifth Task",
// //       "Sixth Task",
// //       "Seventh Task",
// //     ].forEach(insertTask);
// //   }
// // });


// import { Meteor } from "meteor/meteor";
// import { TasksCollection } from "/imports/api/TasksCollection";
// import { Accounts } from 'meteor/accounts-base';
// import '../imports/api/TasksPublications';
// import '../imports/api/tasksMethods';

// const insertTask = (taskText) =>
//   TasksCollection.insertAsync({ text: taskText });

// const SEED_USERNAME = 'meteorite';
// const SEED_PASSWORD = 'password';

// Meteor.startup(async () => {
//   // Check if the user already exists using Meteor.users
//   if (!Meteor.users.findOneAsync({ username: SEED_USERNAME })) {
//     await Accounts.createUser({
//       username: SEED_USERNAME,
//       password: SEED_PASSWORD,
//     });
//   }

//   // Insert initial tasks if none exist
//   if ((await TasksCollection.find().countAsync()) === 0) {
//     [
//       "First Task",
//       "Second Task",
//       "Third Task",
//       "Fourth Task",
//       "Fifth Task",
//       "Sixth Task",
//       "Seventh Task",
//     ].forEach(insertTask);
//   }
// });


// import { Meteor } from "meteor/meteor";
// import { TasksCollection } from "/imports/api/TasksCollection";
// import { Accounts } from 'meteor/accounts-base';
// import '../imports/api/TasksPublications'
// import '../imports/api/tasksMethods'

// const insertTask = (taskText) =>
//   TasksCollection.insertAsync({ text: taskText });


// const SEED_USERNAME = 'meteorite';
// const SEED_PASSWORD = 'password';

// Meteor.startup(async () => {

//   if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
//     await Accounts.createUser({
//       username: SEED_USERNAME,
//       password: SEED_PASSWORD,
//     });
//   }

//   if ((await TasksCollection.find().countAsync()) === 0) {
//     [
//       "First Task",
//       "Second Task",
//       "Third Task",
//       "Fourth Task",
//       "Fifth Task",
//       "Sixth Task",
//       "Seventh Task",
//     ].forEach(insertTask);
//   }
// });


import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/TasksPublications';
import '../imports/api/tasksMethods';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {

  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }

  
  // Check if the user already exists
  // const existingUser =await Meteor.users.findOneAsync({ username: SEED_USERNAME });

  // console.log("user",existingUser)
  // if (!existingUser) {
  //   try {
  //     const userId = await Accounts.createUser({
  //       username: SEED_USERNAME,
  //       password: SEED_PASSWORD,
  //     });
  //     console.log(`User created with ID: ${userId}`);
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //   }
  // } else {
  //   console.log("User already exists:", existingUser);
  // }

  

  // // Insert initial tasks if none exist
  // if ((await TasksCollection.find().countAsync()) === 0) {
  //   [
  //     "First Task",
  //     "Second Task",
  //     "Third Task",
  //     "Fourth Task",
  //     "Fifth Task",
  //     "Sixth Task",
  //     "Seventh Task",
  //   ].forEach(insertTask);
  // }
});
