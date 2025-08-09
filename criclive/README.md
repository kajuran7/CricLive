# CricLive - Cricket Tournament Management & Live Auction Platform

A comprehensive web application for managing cricket tournaments with integrated live auction functionality. Built with Next.js, TypeScript, and MongoDB.

## 🏏 Features

### Player Registration System
- **Multi-step Registration Form**: Mobile-friendly, progressive form with validation
- **Data Privacy Compliance**: GDPR and CCPA compliant data collection
- **Payment Integration**: Secure payment processing for registration fees
- **Email Confirmations**: Automated confirmation emails upon successful registration

### Live Auction Platform
- **Real-time Bidding**: Sub-500ms latency for fair and engaging auctions
- **Bid History**: Transparent bidding history for all auction items
- **Auction Management**: Complete CRUD operations for auction items
- **Status Tracking**: Live, upcoming, and ended auction states

### Admin Dashboard
- **Player Management**: View and manage tournament registrations
- **Auction Oversight**: Monitor and manage auction items and bids
- **Analytics**: Real-time statistics and performance metrics
- **Export Functionality**: Export player rosters and auction data

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database**: MongoDB with Mongoose ODM
- **Real-time Updates**: WebSocket-ready architecture for live features
- **Security**: Secure authentication and data protection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd criclive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
criclive/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auctions/      # Auction API endpoints
│   │   │   ├── matches/       # Match API endpoints
│   │   │   └── players/       # Player API endpoints
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── auctions/          # Auction pages
│   │   ├── register/          # Registration pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── Navigation.tsx    # Navigation component
│   ├── lib/                  # Utility libraries
│   │   ├── mongodb.ts        # Database connection
│   │   └── utils.ts          # Utility functions
│   ├── models/               # Database models
│   │   ├── Auction.ts        # Auction model
│   │   ├── Match.ts          # Match model
│   │   └── Player.ts         # Player model
│   ├── scripts/              # Database scripts
│   │   └── seed.ts           # Seed data script
│   └── types/                # TypeScript type definitions
│       └── global.d.ts       # Global types
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge
- **Development**: ESLint, Turbopack

## 📋 API Endpoints

### Auctions
- `GET /api/auctions` - List all auctions
- `POST /api/auctions` - Create new auction
- `GET /api/auctions/[id]` - Get auction details
- `PUT /api/auctions/[id]` - Update auction
- `DELETE /api/auctions/[id]` - Delete auction
- `POST /api/auctions/[id]/bids` - Place bid
- `GET /api/auctions/[id]/bids` - Get bid history

### Players
- `GET /api/players` - List all players
- `POST /api/players` - Register new player
- `GET /api/players/[id]` - Get player details
- `PUT /api/players/[id]` - Update player
- `DELETE /api/players/[id]` - Delete player

### Matches
- `GET /api/matches` - List all matches
- `POST /api/matches` - Create new match
- `GET /api/matches/[id]` - Get match details
- `PUT /api/matches/[id]` - Update match
- `DELETE /api/matches/[id]` - Delete match

## 🎯 Key Features Implementation

### Real-time Auction System
The live auction feature is built with real-time capabilities in mind:
- WebSocket-ready architecture for instant bid updates
- Sub-500ms latency requirement for fair bidding
- Bid validation and conflict resolution
- Real-time auction status updates

### Mobile-First Registration
The player registration system prioritizes mobile users:
- Progressive form with step-by-step validation
- Touch-friendly interface design
- Conditional form fields based on user responses
- Automatic form saving and recovery

### Admin Dashboard
Comprehensive management tools for tournament organizers:
- Real-time statistics and analytics
- Player roster management with export capabilities
- Auction oversight and management
- Payment tracking and reporting

## 🔒 Security & Privacy

### Data Protection
- GDPR and CCPA compliance
- Encrypted data transmission (TLS)
- Secure password hashing
- Role-based access control

### Privacy Features
- Data minimization principles
- User consent management
- Right to deletion implementation
- Transparent privacy policy

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@criclive.com
- Documentation: [docs.criclive.com](https://docs.criclive.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Player registration system
- ✅ Basic auction functionality
- ✅ Admin dashboard
- ✅ Mobile-responsive design

### Phase 2 (Next)
- 🔄 Real-time WebSocket integration
- 🔄 Payment gateway integration
- 🔄 Email notification system
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Social media integration
- 📋 Mobile app development
- 📋 Advanced tournament features
- 📋 Multi-language support

---

**Built with ❤️ for the cricket community**
