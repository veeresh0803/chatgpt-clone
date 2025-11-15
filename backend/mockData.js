// Mock data for sessions and conversations
export const mockSessions = {
  "session-001": {
    id: "session-001",
    title: "Understanding React Hooks",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-1",
        type: "user",
        content: "What are React hooks?",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "msg-2",
        type: "assistant",
        content: "React hooks are functions that let you use state and other React features in functional components.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5000).toISOString(),
        tableData: {
          title: "React Hooks Overview",
          description: "Common hooks and their purposes",
          columns: ["Hook Name", "Purpose", "Example Use"],
          rows: [
            ["useState", "Manage state in functional components", "const [count, setCount] = useState(0)"],
            ["useEffect", "Handle side effects after render", "useEffect(() => { ... }, [])"],
            ["useContext", "Access context values", "const theme = useContext(ThemeContext)"],
            ["useReducer", "Complex state logic", "const [state, dispatch] = useReducer(reducer, init)"],
            ["useCallback", "Memoize functions", "const memoFunc = useCallback(() => {...}, [])"]
          ]
        }
      }
    ]
  },
  "session-002": {
    id: "session-002",
    title: "TailwindCSS Utility Classes",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-3",
        type: "user",
        content: "How do I use TailwindCSS for responsive design?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "msg-4",
        type: "assistant",
        content: "TailwindCSS provides responsive prefixes like sm:, md:, lg: that let you apply styles at specific breakpoints.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 5000).toISOString(),
        tableData: {
          title: "TailwindCSS Breakpoints",
          description: "Responsive design breakpoints and their pixel values",
          columns: ["Prefix", "Breakpoint", "CSS"],
          rows: [
            ["sm", "640px", "@media (min-width: 640px)"],
            ["md", "768px", "@media (min-width: 768px)"],
            ["lg", "1024px", "@media (min-width: 1024px)"],
            ["xl", "1280px", "@media (min-width: 1280px)"],
            ["2xl", "1536px", "@media (min-width: 1536px)"]
          ]
        }
      }
    ]
  }
};

export const mockAnswers = [
  {
    title: "JavaScript Array Methods",
    description: "Common array methods for data manipulation",
    columns: ["Method", "Purpose", "Returns", "Example"],
    rows: [
      ["map()", "Transform each element", "New array", "[1,2,3].map(x => x * 2) → [2,4,6]"],
      ["filter()", "Keep elements matching condition", "New array", "[1,2,3].filter(x => x > 1) → [2,3]"],
      ["reduce()", "Combine elements into single value", "Single value", "[1,2,3].reduce((a,b) => a+b) → 6"],
      ["forEach()", "Execute function on each element", "undefined", "[1,2,3].forEach(x => console.log(x))"],
      ["find()", "Return first matching element", "Element or undefined", "[1,2,3].find(x => x > 2) → 3"]
    ]
  },
  {
    title: "Express.js Middleware",
    description: "Understanding middleware in Express applications",
    columns: ["Middleware Type", "Purpose", "Order", "Example"],
    rows: [
      ["Built-in", "Core functionality", "First", "express.json(), express.static()"],
      ["Custom", "Custom logic", "Middle", "app.use((req, res, next) => {...})"],
      ["Error", "Error handling", "Last", "app.use((err, req, res, next) => {...})"],
      ["Third-party", "External packages", "Any", "cors, helmet, morgan"],
      ["Route", "Route-specific logic", "At route", "app.get('/', middleware, handler)"]
    ]
  },
  {
    title: "REST API Best Practices",
    description: "Guidelines for building scalable REST APIs",
    columns: ["Practice", "Description", "HTTP Method", "Example"],
    rows: [
      ["Resource naming", "Use nouns for endpoints", "GET", "/api/users, /api/posts"],
      ["Status codes", "Use proper HTTP codes", "Various", "200, 201, 400, 404, 500"],
      ["Versioning", "Version your API", "GET", "/api/v1/users"],
      ["Pagination", "Limit response data", "GET", "/api/posts?page=1&limit=10"],
      ["Error handling", "Return consistent errors", "Various", "{error: 'message', code: 'CODE'}"]
    ]
  },
  {
    title: "React Component Lifecycle",
    description: "Phases of a React component's existence",
    columns: ["Phase", "Description", "Hook Used", "When to Use"],
    rows: [
      ["Mounting", "Component added to DOM", "useEffect(() => {...}, [])", "Initialize, fetch data"],
      ["Updating", "Component re-renders", "useEffect(() => {...}, [deps])", "React to prop/state changes"],
      ["Unmounting", "Component removed from DOM", "useEffect(() => () => {...}, [])", "Cleanup, subscriptions"],
      ["Error handling", "Catches render errors", "useErrorBoundary()", "Error recovery"],
      ["Performance", "Optimize re-renders", "useMemo, useCallback", "Heavy computations"]
    ]
  }
];
