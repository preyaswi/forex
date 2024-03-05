# Forex System Backend Rest API
Forex System Backend Rest API is a robust solution for handling forex-related operations, developed using NestJS, a powerful Node.js framework. The Forex Service API is a service that provides functionality for fetching live FX conversion rates using the Alphavantage API, generating quote IDs, and managing user accounts.

# Key Features
Dependency Injection: Utilizes dependency injection for flexible component integration.
External API Integration: Integrates with Alpha Vantage for fetching real-time forex exchange rates.
Cache Service: Implements caching using a cache service to optimize performance.
Security: Utilizes exception handling and ensures secure practices in handling user input.
Swagger API Documentation: Offers interactive API documentation using Swagger for easy exploration and testing.


# Environment Variables:
 Set up environment variables, including DATABASE_URL for database configuration(neondb) and API_KEY for Alpha Vantage API access.

# API Documentation
Interactive API documentation is available using Swagger. Explore and test the API endpoints in real-time.
http://localhost:3000/api#/

# Getting Started
To run the project locally, follow these steps:

Clone the repository.
Install dependencies using pnpm install.
Set up environment variables, including DATABASE_URL for database configuration and API_KEY for the Alpha Vantage API.
Build and run the project using pnpm start.
License
This project is licensed under the [LICENSE_NAME] license - see the LICENSE.md file for details.

Acknowledgments
NestJS Framework
Alpha Vantage API
Swagger API Documentation
Using forex-system project
To use the forex-system project, follow these steps:

bash
Copy code
# Navigate into the project
cd ./forex-system

# Install dependencies
pnpm install

# Run the project
pnpm start
Environment Variables
Before running the project, you need to set the following environment variables with your corresponding values:

# Database Configuration
DATABASE_URL: Database connection URL(used neondb)
Alpha Vantage
API_KEY: Alpha Vantage API key for forex rate fetching
Cache Service
CACHE_TTL: Time-to-live for cache entries (in seconds)