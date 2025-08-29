# Aave Wallet Investigator

See it live ![https://wallet.justuseaave.xyz/]

A beautiful, responsive Next.js application that allows users to explore Aave transaction history for any Ethereum wallet address. Built with modern technologies and a polished crypto dashboard aesthetic.

![Aave Wallet Investigator](https://via.placeholder.com/800x400/1e293b/ffffff?text=Aave+Wallet+Investigator)

## ✨ Features

- **🔍 Wallet Address Search**: Enter any Ethereum wallet address to fetch Aave transaction history
- **📊 Interactive Dashboard**: Beautiful, modern UI with crypto dashboard styling
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🎨 Dark Theme**: Modern dark theme with gradient backgrounds and glass morphism
- **⚡ Real-time Data**: Fetches live data from Aave's GraphQL API
- **🎭 Transaction Types**: Color-coded badges for different transaction types (Supply, Withdraw, Borrow, Repay, Collateral, Liquidation)
- **💫 Smooth Animations**: Powered by Framer Motion for delightful interactions
- **🚀 Demo Mode**: Try the app instantly with sample data

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Data Layer**: Aave React SDK
- **Animations**: Framer Motion
- **Date Formatting**: date-fns
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wallet-investigator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup** 
   No additional environment variables are required! The Aave SDK handles all API connections automatically.

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💡 Usage

### Basic Usage

1. **Enter a Wallet Address**: Paste any Ethereum wallet address in the search field
2. **Fetch Data**: Click the "Fetch" button to retrieve Aave transaction history
3. **Explore Results**: View transactions in a beautiful table (desktop) or card layout (mobile)

### Demo Mode

Click the "Try Demo" button to instantly see the app in action with sample transaction data.

### Transaction Types

The app displays various Aave transaction types with color-coded badges:

- 🟢 **Supply**: Deposit assets to earn interest
- 🔵 **Withdraw**: Remove supplied assets
- 🟠 **Borrow**: Take out loans against collateral
- 🟣 **Repay**: Pay back borrowed amounts
- 🟡 **Collateral**: Enable/disable assets as collateral
- 🔴 **Liquidation**: Liquidation events

## 🏗 Project Structure

```
wallet-investigator/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout with Aave Provider
│   └── page.tsx             # Main application page
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── aave-provider.tsx    # Aave SDK provider wrapper
├── lib/
│   ├── aaveClient.ts        # Aave SDK client configuration
│   ├── types.ts             # TypeScript type definitions
│   ├── formatters.ts        # Utility functions for formatting
│   ├── mockData.ts          # Sample data for demo mode
│   └── utils.ts             # General utilities
└── public/                  # Static assets
```

## 🔧 Configuration

### Aave SDK Configuration

The app uses the Aave React SDK which automatically handles:
- API endpoints and connections
- Data fetching and caching
- TypeScript types for all Aave protocol data
- Error handling and retry logic

No additional configuration is required!

### Customization

- **Styling**: Modify `app/globals.css` and Tailwind classes
- **UI Components**: Customize shadcn/ui components in `components/ui/`
- **Aave Client**: Modify client configuration in `lib/aaveClient.ts`
- **Mock Data**: Modify sample data in `lib/mockData.ts`

## 📋 Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Add shadcn/ui components
pnpm dlx shadcn@latest add [component-name]
```

## 🎨 Design Features

- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout the UI
- **Hover Effects**: Smooth transitions and interactive states
- **Responsive Tables**: Tables transform into cards on mobile devices
- **Loading States**: Elegant loading animations with spinners
- **Error Handling**: User-friendly error messages and states

## 🚦 Transaction Display

### Desktop View
- Comprehensive table with sortable columns
- Token logos and market information
- Direct links to block explorers
- Formatted amounts in USD and token values

### Mobile View
- Collapsible card layout
- Essential information at a glance
- Touch-friendly interface
- Swipe-friendly navigation

## 🔗 Aave SDK Integration

The app uses the Aave React SDK's `useUserTransactionHistory` hook:

```typescript
const { data, loading, error } = useUserTransactionHistory({
  market: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2', // AaveV3Ethereum
  user: walletAddress,
  chainId: 1, // Ethereum mainnet
});
```

This automatically fetches all transaction types (Supply, Withdraw, Borrow, Repay, Collateral, Liquidation) with proper TypeScript typing and error handling.

## 🛟 Troubleshooting

### Common Issues

1. **Aave SDK Hook Errors**
   - Ensure wallet address is a valid Ethereum address
   - Check that the Aave provider is properly wrapped around your app
   - Make sure you're using the correct chainId and market address

2. **TypeScript Errors**
   - Run `pnpm build` to check for type errors
   - Ensure all dependencies are properly installed
   - The Aave SDK provides comprehensive TypeScript support

3. **Network Issues**
   - The Aave SDK automatically handles API connections
   - No manual endpoint configuration needed
   - Check browser console for any network errors

### Development Tips

- Use the demo mode to test UI without API calls
- The Aave SDK provides excellent DevTools integration
- Check the Aave SDK documentation for advanced usage patterns
- Use React DevTools for component debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Aave Protocol](https://aave.com/) for providing the powerful React SDK
- [Aave React SDK](https://www.npmjs.com/package/@aave/react) for seamless protocol integration
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Built with ❤️ for the DeFi community**
