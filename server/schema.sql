CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255),
  name VARCHAR(255),
  description TEXT,
  features JSON,
  durationValue INT,
  durationType VARCHAR(50),
  level VARCHAR(255),
  price DECIMAL(10, 2) DEFAULT 0,
  feeText VARCHAR(255),
  seats VARCHAR(255),
  discountText VARCHAR(255),
  discountCode VARCHAR(100),
  discountType VARCHAR(50),
  discountValue DECIMAL(10, 2),
  type VARCHAR(50) DEFAULT 'course', -- course, internship, workshop
  category VARCHAR(255),
  displayOrder INT DEFAULT 99,
  mode VARCHAR(50) DEFAULT 'Offline',
  isOnline BOOLEAN DEFAULT FALSE,
  imageUrl VARCHAR(555),
  syllabusUrl VARCHAR(555),
  isPreview BOOLEAN DEFAULT FALSE,
  registerFeeFixed DECIMAL(10, 2) DEFAULT 0,
  registerFeePercent DECIMAL(5, 2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS applications (
  id VARCHAR(100) PRIMARY KEY, -- Keep as string to match old IDs (timestamps)
  refNo VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50), -- course, internship
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  dob DATE,
  studying VARCHAR(255),
  leadDetails TEXT,
  course VARCHAR(255), -- program name
  educationLevel VARCHAR(255),
  department VARCHAR(255),
  internshipDomain VARCHAR(255),
  duration VARCHAR(100),
  projectType VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Applied',
  paymentId VARCHAR(255),
  paymentStatus VARCHAR(50),
  paymentMode VARCHAR(50),
  amountPaid DECIMAL(10, 2),
  amountDue DECIMAL(10, 2),
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);
