// Simulated API calls for users
export async function fetchUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123456789',
            status: 'active',
            role: 'user',
            license: 'D1234567',
          },
          // ...more mock users
        ]);
      }, 400);
    });
  }
  
  export async function saveUser(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...userData, id: Date.now() });
      }, 300);
    });
  }
  
  export async function deleteUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, userId });
      }, 300);
    });
  }
  