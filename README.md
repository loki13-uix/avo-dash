# Next.js Project with Feature Slice Design

This is a [Next.js](https://nextjs.org) project that follows the Feature Slice Design (FSD) methodology for better scalability and maintainability.

## Project Architecture

The project follows Feature Slice Design principles with the following structure:

```
src/
├── app/          # Next.js App Router pages and layouts
├── entities/     # Business entities (users, products, etc.)
│   └── {entity}
│       ├── model/     # Domain logic and state
│       ├── ui/        # Presentational components
│       └── api/       # API integration layer
├── features/    # User interactions and business logic
│   └── {feature}
│       ├── model/     # Feature-specific logic
│       ├── ui/        # Feature components
│       └── api/       # Feature-specific API calls
├── widgets/     # Composite components combining entities and features
│   └── {widget}
│       ├── ui/        # Widget components
│       └── model/     # Widget-specific logic
├── shared/      # Shared code, utils, and UI kit
│   ├── api/     # Base API setup
│   ├── config/  # Global configuration
│   ├── lib/     # Utility functions
│   └── ui/      # Shared UI components
└── pages/       # (Optional) Next.js Pages Router if used
```

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <project-name>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Guidelines

### Creating New Features

1. Create a new feature directory:

```bash
mkdir -p src/features/your-feature/{ui,model,api}
```

2. Implement the feature components:

- `ui/` - React components
- `model/` - Business logic, state management
- `api/` - API integration

### Creating New Entities

1. Create a new entity directory:

```bash
mkdir -p src/entities/your-entity/{ui,model,api}
```

2. Implement the entity:

- Define the entity model
- Create UI components
- Set up API integration

### Creating Widgets

1. Create a new widget directory:

```bash
mkdir -p src/widgets/your-widget/{ui,model}
```

2. Combine entities and features to create a widget

### Shared Layer Guidelines

- Place reusable components in `shared/ui`
- Add utility functions to `shared/lib`
- Configure API clients in `shared/api`
- Store global configs in `shared/config`

## Best Practices

1. **Layer Independence**: Higher layers can import from lower layers, but not vice versa
   - widgets → features → entities → shared
2. **Feature Isolation**: Each feature should be independent and self-contained

3. **Public API**: Each slice should have a public API through index files

4. **Shared Code**: Avoid direct imports between features; use shared layer instead

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Feature Slice Design](https://feature-sliced.design/)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

## Deployment

Deploy your Next.js app using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
