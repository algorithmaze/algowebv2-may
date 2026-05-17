
const fetch = require('node-fetch');

async function testAddCourse() {
  const url = 'http://localhost:3001/api/courses';
  const newCourse = {
    title: 'Test Course ' + Date.now(),
    desc: 'This is a test course description.',
    price: 99,
    type: 'course',
    displayOrder: 100,
    features: ['Feature 1', 'Feature 2']
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse)
    });

    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

testAddCourse();
