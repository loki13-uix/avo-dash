export type TreeNode = {
  id: string
  name: string
  variant: 'file' | 'folder'
  nodes: TreeNode[]
}

export type Tree = TreeNode[]

export const folderTree: TreeNode[] = [
  {
    id: '1',
    name: 'root',
    variant: 'folder',
    nodes: [
      {
        id: '2',
        name: 'src',
        variant: 'folder',
        nodes: [
          {
            id: '3',
            name: 'components',
            variant: 'folder',
            nodes: [
              {
                id: '4',
                name: 'Header.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '5',
                name: 'Footer.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '6',
                name: 'Sidebar.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '7',
                name: 'Navbar.js',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '8',
            name: 'pages',
            variant: 'folder',
            nodes: [
              {
                id: '9',
                name: 'Home.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '10',
                name: 'About.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '11',
                name: 'Contact.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '12',
                name: 'Blog.js',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '13',
            name: 'utils',
            variant: 'folder',
            nodes: [
              {
                id: '14',
                name: 'helpers.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '15',
                name: 'formatDate.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '16',
                name: 'api.js',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '17',
            name: 'App.js',
            variant: 'file',
            nodes: [],
          },
          {
            id: '18',
            name: 'index.js',
            variant: 'file',
            nodes: [],
          },
        ],
      },
      {
        id: '19',
        name: 'public',
        variant: 'folder',
        nodes: [
          {
            id: '20',
            name: 'index.html',
            variant: 'file',
            nodes: [],
          },
          {
            id: '21',
            name: 'favicon.ico',
            variant: 'file',
            nodes: [],
          },
          {
            id: '22',
            name: 'assets',
            variant: 'folder',
            nodes: [
              {
                id: '23',
                name: 'images',
                variant: 'folder',
                nodes: [
                  {
                    id: '24',
                    name: 'logo.png',
                    variant: 'file',
                    nodes: [],
                  },
                  {
                    id: '25',
                    name: 'banner.jpg',
                    variant: 'file',
                    nodes: [],
                  },
                  {
                    id: '26',
                    name: 'icon.svg',
                    variant: 'file',
                    nodes: [],
                  },
                ],
              },
              {
                id: '27',
                name: 'fonts',
                variant: 'folder',
                nodes: [
                  {
                    id: '28',
                    name: 'roboto.ttf',
                    variant: 'file',
                    nodes: [],
                  },
                  {
                    id: '29',
                    name: 'open-sans.woff',
                    variant: 'file',
                    nodes: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '30',
        name: 'tests',
        variant: 'folder',
        nodes: [
          {
            id: '31',
            name: 'unit',
            variant: 'folder',
            nodes: [
              {
                id: '32',
                name: 'Header.test.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '33',
                name: 'Footer.test.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '34',
                name: 'api.test.js',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '35',
            name: 'integration',
            variant: 'folder',
            nodes: [
              {
                id: '36',
                name: 'HomePage.test.js',
                variant: 'file',
                nodes: [],
              },
              {
                id: '37',
                name: 'ContactPage.test.js',
                variant: 'file',
                nodes: [],
              },
            ],
          },
        ],
      },
      {
        id: '38',
        name: 'docs',
        variant: 'folder',
        nodes: [
          {
            id: '39',
            name: 'api.md',
            variant: 'file',
            nodes: [],
          },
          {
            id: '40',
            name: 'setup.md',
            variant: 'file',
            nodes: [],
          },
          {
            id: '41',
            name: 'contributing.md',
            variant: 'file',
            nodes: [],
          },
        ],
      },
      {
        id: '42',
        name: 'README.md',
        variant: 'file',
        nodes: [],
      },
      {
        id: '43',
        name: 'package.json',
        variant: 'file',
        nodes: [],
      },
      {
        id: '44',
        name: '.gitignore',
        variant: 'file',
        nodes: [],
      },
      {
        id: '45',
        name: 'config',
        variant: 'folder',
        nodes: [
          {
            id: '46',
            name: 'webpack.config.js',
            variant: 'file',
            nodes: [],
          },
          {
            id: '47',
            name: 'babel.config.js',
            variant: 'file',
            nodes: [],
          },
          {
            id: '48',
            name: 'eslint.config.js',
            variant: 'file',
            nodes: [],
          },
        ],
      },
      {
        id: '49',
        name: 'scripts',
        variant: 'folder',
        nodes: [
          {
            id: '50',
            name: 'build.sh',
            variant: 'file',
            nodes: [],
          },
          {
            id: '51',
            name: 'deploy.sh',
            variant: 'file',
            nodes: [],
          },
          {
            id: '52',
            name: 'test.sh',
            variant: 'file',
            nodes: [],
          },
        ],
      },
    ],
  },
  {
    id: '53',
    name: 'test.ts',
    variant: 'file',
    nodes: [
      {
        id: '54',
        name: 'test1.ts',
        variant: 'file',
        nodes: [],
      },
      {
        id: '55',
        name: 'test2.ts',
        variant: 'file',
        nodes: [],
      },
    ],
  },
]
