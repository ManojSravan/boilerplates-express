export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// In-memory data store
export const users = [
  new User('1', 'John Doe', 'john@example.com'),
  new User('2', 'Jane Smith', 'jane@example.com')
];