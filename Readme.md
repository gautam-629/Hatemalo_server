# Service Marketplace Platform

A comprehensive platform connecting service seekers with service providers,
facilitating easy discovery, booking, and management of various services ranging
from home maintenance to professional consulting.

## Overview

This platform serves as a marketplace where:

- Service seekers can search, compare, book, and review service providers
- Service providers can list services, manage bookings, and receive payments
- Administrators can oversee platform operations and analyze performance metrics

## Key Features

### User Management

- Secure authentication system
- Detailed user profiles for both service seekers and providers
- Provider verification system

### Service Management

- Advanced search and discovery with filters
- Category-based service organization
- Price range specification
- Service provider listings with credentials

### Booking System

- Integrated calendar for scheduling
- Real-time booking management
- Status tracking
- Automated notifications

### Communication

- Real-time messaging between users
- Notification system
- Booking-related updates

### Reviews and Ratings

- Post-service feedback system
- Provider ratings
- Quality assurance metrics

### Payments

- Secure payment processing
- Multiple payment method support
- Transaction history
- Automated invoicing

### Location Services

- Geolocation-based service discovery
- Provider tracking
- Map integration

### Administration

- Comprehensive admin dashboard
- Analytics and reporting tools
- Platform management features

## Database Schema

### 1. Users

Stores information about both service seekers and providers.

| Column          | Type         | Description            |
| --------------- | ------------ | ---------------------- |
| user_id         | INT          | Primary key            |
| name            | VARCHAR(255) | Full name              |
| email           | VARCHAR(255) | Unique email for login |
| phone_number    | VARCHAR(20)  | Contact number         |
| password        | VARCHAR(255) | Hashed password        |
| user_type       | ENUM         | 'seeker' or 'provider' |
| profile_picture | VARCHAR(255) | Profile image URL/path |
| created_at      | TIMESTAMP    | Creation timestamp     |
| updated_at      | TIMESTAMP    | Last update timestamp  |

### 2. ServiceProviders

Additional information specific to service providers.

| Column           | Type         | Description                    |
| ---------------- | ------------ | ------------------------------ |
| provider_id      | INT          | References Users.user_id       |
| business_name    | VARCHAR(255) | Business name                  |
| services_offered | TEXT         | Service description            |
| certifications   | TEXT         | Provider certifications        |
| license_document | VARCHAR(255) | Business license document path |
| verified         | BOOLEAN      | Verification status            |

### 3. Services

Available services on the platform.

| Column      | Type         | Description                       |
| ----------- | ------------ | --------------------------------- |
| service_id  | INT          | Primary key                       |
| name        | VARCHAR(255) | Service name                      |
| category_id | INT          | References Categories.category_id |
| description | TEXT         | Service description               |
| price_range | VARCHAR(50)  | Price range                       |
| created_at  | TIMESTAMP    | Creation timestamp                |
| updated_at  | TIMESTAMP    | Last update timestamp             |

### 4. Categories

Service categorization system.

| Column             | Type         | Description                  |
| ------------------ | ------------ | ---------------------------- |
| category_id        | INT          | Primary key                  |
| name               | VARCHAR(255) | Category name                |
| parent_category_id | INT          | Self-referencing foreign key |
| created_at         | TIMESTAMP    | Creation timestamp           |
| updated_at         | TIMESTAMP    | Last update timestamp        |

### 5. Bookings

Service booking records.

| Column       | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| booking_id   | INT       | Primary key                             |
| seeker_id    | INT       | References Users.user_id                |
| provider_id  | INT       | References ServiceProviders.provider_id |
| service_id   | INT       | References Services.service_id          |
| booking_date | DATE      | Service date                            |
| status       | ENUM      | Booking status                          |
| created_at   | TIMESTAMP | Creation timestamp                      |
| updated_at   | TIMESTAMP | Last update timestamp                   |

### 6. Reviews

Service feedback system.

| Column     | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| review_id  | INT       | Primary key                    |
| booking_id | INT       | References Bookings.booking_id |
| rating     | INT       | Numerical rating               |
| comment    | TEXT      | Review text                    |
| created_at | TIMESTAMP | Creation timestamp             |
| updated_at | TIMESTAMP | Last update timestamp          |

### 7. Payments

Payment transaction records.

| Column         | Type          | Description                    |
| -------------- | ------------- | ------------------------------ |
| payment_id     | INT           | Primary key                    |
| booking_id     | INT           | References Bookings.booking_id |
| amount         | DECIMAL(10,2) | Payment amount                 |
| payment_method | ENUM          | Payment method used            |
| payment_status | ENUM          | Transaction status             |
| transaction_id | VARCHAR(255)  | Payment gateway transaction ID |
| created_at     | TIMESTAMP     | Creation timestamp             |
| updated_at     | TIMESTAMP     | Last update timestamp          |

### 8. Messages

User communication system.

| Column      | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| message_id  | INT       | Primary key                    |
| sender_id   | INT       | References Users.user_id       |
| receiver_id | INT       | References Users.user_id       |
| booking_id  | INT       | References Bookings.booking_id |
| content     | TEXT      | Message content                |
| sent_at     | TIMESTAMP | Sending timestamp              |

### 9. Notifications

System notifications.

| Column          | Type      | Description              |
| --------------- | --------- | ------------------------ |
| notification_id | INT       | Primary key              |
| user_id         | INT       | References Users.user_id |
| message         | TEXT      | Notification content     |
| type            | ENUM      | Notification type        |
| read            | BOOLEAN   | Read status              |
| created_at      | TIMESTAMP | Creation timestamp       |

### 10. Admin

Platform administrator management.

| Column     | Type         | Description           |
| ---------- | ------------ | --------------------- |
| admin_id   | INT          | Primary key           |
| name       | VARCHAR(255) | Admin name            |
| email      | VARCHAR(255) | Admin email           |
| password   | VARCHAR(255) | Hashed password       |
| created_at | TIMESTAMP    | Creation timestamp    |
| updated_at | TIMESTAMP    | Last update timestamp |

### 11. Analytics

Platform metrics tracking.

| Column       | Type         | Description         |
| ------------ | ------------ | ------------------- |
| analytics_id | INT          | Primary key         |
| metric_name  | VARCHAR(255) | Metric identifier   |
| value        | FLOAT        | Metric value        |
| recorded_at  | TIMESTAMP    | Recording timestamp |
