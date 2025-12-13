# Rekap Resi - Project Overview
**Website Live View :** [Rekap Resi](rekap-resi.vercel.app)

## About This Project

**Rekap Resi** is a modern web application for managing and tracking delivery receipts (Resi). It provides a comprehensive solution for logistics teams, delivery personnel, and anyone managing shipment documentation.

## Key Information

| Item | Details |
|------|---------|
| **Project Name** | Rekap Resi |
| **Repository** | [github.com/novafs/rekap-resi](https://github.com/novafs/rekap-resi) |
| **Owner** | @novafs |
| **Current Version** | 0.0.0 |
| **Status** | Active Development |
| **Last Updated** | December 2024 |

## Technology Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool
- **React Router 7.9.6** - Routing
- **Tailwind CSS 4.1.17** - Styling
- **Axios 1.13.2** - HTTP client

### Libraries
- **SweetAlert2** - Alert dialogs
- **Lucide React** - Icon library
- **@zxing/browser** - Barcode scanning
- **react-qr-barcode-scanner** - QR scanner component

### Development Tools
- **ESLint** - Code linting
- **Vite plugins** - Build optimization

## Project Structure

```
rekap-resi/
├── src/
│   ├── api/              # API client
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── assets/          # Static assets
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Public files
├── package.json        # Dependencies
├── vite.config.js     # Vite config
├── eslint.config.js   # ESLint config
└── vercel.json        # Deployment config
```

## Core Features

### 1. **Authentication**
- User login/signup
- Token-based authorization
- Protected routes
- Session management

### 2. **Dashboard**
- Receipt statistics (daily, weekly, monthly)
- Recent receipts overview
- Quick action buttons
- Responsive layout

### 3. **Receipt Management**
- Add new receipts
- View receipt list
- Edit receipts
- Delete receipts
- Filter and search

### 4. **Receipt Scanning**
- QR code scanning
- Barcode scanning
- Camera-based capture
- Auto-populate form

### 5. **Responsive Design**
- Mobile-first approach
- Tablet optimized
- Desktop support
- Touch-friendly interface

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI library |
| react-router-dom | 7.9.6 | Routing |
| axios | 1.13.2 | HTTP requests |
| tailwindcss | 4.1.17 | Styling |
| sweetalert2 | 11.26.3 | Alerts |
| lucide-react | 0.555.0 | Icons |
| @zxing/browser | 0.1.5 | Barcode detection |

## Getting Started

### 1. Installation
```bash
git clone https://github.com/novafs/rekap-resi.git
cd rekap-resi
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env
npm run dev
```

### 2. Development
- Create feature branch from main
- Follow git workflow
- Write code following standards
- Test locally with `npm run dev`
- Submit pull request

### 3. Deployment
- Build with `npm run build`
- Use Vercel, Netlify, or any hosting
- Configure environment variables
- Deploy using CI/CD or manual upload

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Variables

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Rekap Resi
```

## Architecture Overview

### Authentication Flow
1. User logs in with email/password
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API requests
5. PrivateRoute verifies token for protected pages

### Data Flow
1. Component renders
2. useEffect fetches data from API
3. Data stored in component state
4. UI updates when state changes
5. User interactions trigger handlers
6. Handlers send requests to API

### Routing Structure
```
/sign-in          (public) - Login page
/sign-up          (public) - Registration page
/dashboard        (protected) - Main dashboard
  /list-resi      (protected) - List receipts
  /add-resi       (protected) - Add receipt form
  /scan-resi      (protected) - Scanner page
```

## Known Limitations

From README.md, the following items need attention:

- [ ] Scan Image Camera & File functionality not fully tested
- [ ] Responsive mobile display needs refinement
- [ ] Consider implementing useLoaderData for better data fetching
- [ ] Need to implement token refresh mechanism
- [ ] Should add loading states to all API calls
- [ ] Missing error boundaries for error handling

## Future Enhancements

Planned features and improvements:

1. **Advanced Features**
   - Batch operations
   - Real-time notifications
   - Analytics dashboard
   - Advanced filtering

2. **Mobile**
   - React Native mobile app
   - Offline support
   - Push notifications

3. **Performance**
   - Code splitting
   - Image optimization
   - Caching strategy

4. **Quality**
   - Unit tests
   - E2E tests
   - CI/CD pipeline

5. **User Experience**
   - Multi-language support
   - Dark mode
   - Advanced UI components

## Deployment Used

### Vercel
- Easy deployment from GitHub
- Automatic deployments
- Built-in analytics
- Website Link [Rekap Resi](rekap-resi.vercel.app)

### External Resources
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

### Issues & Help
1. Check documentation files first
2. Review browser console for errors
3. Check network requests in DevTools
4. Create GitHub issue with details

## Contributing

1. Read README.md for standards
2. Create feature branch
3. Follow commit message conventions
4. Submit pull request
5. Request code review
6. Merge after approval

## Quick Command Reference

```bash
# Installation
npm install

# Development
npm run dev           # Start dev server
npm run lint          # Check code quality

# Production
npm run build         # Build for production
npm run preview       # Preview build

# Git Workflow
git checkout -b feature/name    # Create branch
git commit -m "message"         # Commit changes
git push origin feature/name    # Push changes
git pull origin main            # Update main

# Environment
export VITE_API_URL=http://localhost:8000/api
```

## License

This project is private. All rights reserved.

---

## Document Summary

This documentation provides:
- ✅ Complete project overview
- ✅ Installation instructions
- ✅ API reference
- ✅ Component documentation
- ✅ Development guidelines
- ✅ Deployment instructions
- ✅ Troubleshooting help
- ✅ Best practices
- ✅ Future roadmap
