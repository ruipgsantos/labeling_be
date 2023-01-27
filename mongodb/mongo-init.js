print("\n\n MONGO INIT START ###############################\n\n");

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "root",
      db: "admin",
    },
  ],
});

db.user.deleteMany({});
db.case.deleteMany({});

db.user.createIndex({ username: 1 }, { unique: true });

db.user.insertOne({ username: "drdre", password: "thechronic" });

print("\n\n MONGO INIT END ###############################\n\n");
