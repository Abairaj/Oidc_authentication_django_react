# OIDC + OAuth2 PKCE Authentication Project

## Overview

This project demonstrates a secure authentication and authorization system using:

- **Backend:** Python, Django, Django REST Framework (DRF)  
- **Frontend:** React (JSX)  
- **Authentication:** OAuth 2.0, OpenID Connect (OIDC), PKCE, JWT  
- **Multi-provider SSO:** Auth0 (can integrate other providers)  

The system implements a PKCE flow, verifying identity tokens from external providers, and then generating **custom JWT access and refresh tokens** for the frontend. Refresh tokens are handled securely to allow seamless access token renewal without repeated logins.

---

## Features

- Multi-provider OIDC login (currently Auth0; extendable to Google, GitHub, etc.)  
- PKCE (Proof Key for Code Exchange) for secure OAuth2 flows in public clients  
- JWT access and refresh tokens issued by Django backend  
- Token refresh handling for expired access tokens  
- Frontend token storage and management  
- Logout flow that clears tokens and optionally logs out from the SSO provider  
- Simple and scalable setup for multiple API endpoints  

---

## Tech Stack

| Layer     | Technology                                        |
|----------|--------------------------------------------------|
| Backend  | Python, Django, Django REST Framework, SimpleJWT |
| Frontend | React (JSX)       |
| Auth     | OAuth2.0, OpenID Connect, PKCE, JWT, Multi-provider SSO |
| Database | sqllite         |
