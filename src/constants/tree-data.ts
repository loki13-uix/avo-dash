export type TreeNode = {
  id: string
  name: string
  variant: 'file' | 'folder'
  nodes: TreeNode[]
  data?: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    age: number
  }[]
}

export type Tree = TreeNode[]

export const folderTree: TreeNode[] = [
  {
    id: '1',
    name: 'folder 1',
    variant: 'folder',
    nodes: [
      {
        id: '2',
        name: 'folder 2',
        variant: 'folder',
        nodes: [
          {
            id: '3',
            name: 'folder 3',
            variant: 'folder',
            nodes: [
              {
                id: '4',
                name: 'file 1',
                variant: 'file',
                data: [
                  {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    phone: '324242423',
                    address: '1223 New York, USA',
                    age: 12,
                  },
                  {
                    id: '2',
                    name: 'Jane Doe2',
                    email: 'jane.doe12@example.com',
                    phone: '1234567890',
                    address: '123 Main St, Anytown, USA',
                    age: 25,
                  },
                ],
                nodes: [],
              },
              {
                id: '5',
                name: 'file 2',
                variant: 'file',
                data: [
                  {
                    id: '1',
                    name: 'John Doe12312',
                    email: 'john.doe324234@example.com',
                    phone: '324242423',
                    address: '1223 New York, USA',
                    age: 56,
                  },
                  {
                    id: '2',
                    name: 'Jane Doe243423',
                    email: 'jane.doe122342@example.com',
                    phone: '123213123',
                    address: '1223 New Street, USA',
                    age: 34,
                  },
                ],
                nodes: [],
              },
              {
                id: '6',
                name: 'file 3',
                variant: 'file',
                nodes: [],
              },
              {
                id: '7',
                name: 'file 4',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '8',
            name: 'folder 4',
            variant: 'folder',
            nodes: [
              {
                id: '9',
                name: 'file 5',
                variant: 'file',
                nodes: [],
              },
              {
                id: '10',
                name: 'file 6',
                variant: 'file',
                nodes: [],
              },
              {
                id: '11',
                name: 'file 7',
                variant: 'file',
                nodes: [],
              },
              {
                id: '12',
                name: 'file 8',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '13',
            name: 'folder 5',
            variant: 'folder',
            nodes: [
              {
                id: '14',
                name: 'file 9',
                variant: 'file',
                nodes: [],
              },
              {
                id: '15',
                name: 'file 10',
                variant: 'file',
                nodes: [],
              },
              {
                id: '16',
                name: 'file 11',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '17',
            name: 'file 12',
            variant: 'file',
            nodes: [],
          },
          {
            id: '18',
            name: 'file 13',
            variant: 'file',
            nodes: [],
          },
        ],
      },
      {
        id: '19',
        name: 'folder 6',
        variant: 'folder',
        nodes: [
          {
            id: '20',
            name: 'file 14',
            variant: 'file',
            nodes: [],
          },
          {
            id: '21',
            name: 'file 15',
            variant: 'file',
            nodes: [],
          },
          {
            id: '22',
            name: 'folder 7',
            variant: 'folder',
            nodes: [
              {
                id: '23',
                name: 'folder 8',
                variant: 'folder',
                nodes: [
                  {
                    id: '24',
                    name: 'file 16',
                    variant: 'file',
                    nodes: [],
                  },
                  {
                    id: '25',
                    name: 'file 17',
                    variant: 'file',
                    nodes: [],
                  },
                  {
                    id: '26',
                    name: 'file 18',
                    variant: 'file',
                    nodes: [],
                  },
                ],
              },
              {
                id: '27',
                name: 'folder 9',
                variant: 'folder',
                nodes: [
                  {
                    id: '28',
                    name: 'file 19',
                    variant: 'file',
                    nodes: [],
                  },
                  {
                    id: '29',
                    name: 'file 20',
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
        name: 'folder 10',
        variant: 'folder',
        nodes: [
          {
            id: '31',
            name: 'folder 11',
            variant: 'folder',
            nodes: [
              {
                id: '32',
                name: 'file 21',
                variant: 'file',
                nodes: [],
              },
              {
                id: '33',
                name: 'file 22',
                variant: 'file',
                nodes: [],
              },
              {
                id: '34',
                name: 'file 23',
                variant: 'file',
                nodes: [],
              },
            ],
          },
          {
            id: '35',
            name: 'folder 12',
            variant: 'folder',
            nodes: [
              {
                id: '36',
                name: 'file 24',
                variant: 'file',
                nodes: [],
              },
              {
                id: '37',
                name: 'file 25',
                variant: 'file',
                nodes: [],
              },
            ],
          },
        ],
      },
      {
        id: '38',
        name: 'folder 13',
        variant: 'folder',
        nodes: [
          {
            id: '39',
            name: 'file 26',
            variant: 'file',
            nodes: [],
          },
          {
            id: '40',
            name: 'file 27',
            variant: 'file',
            nodes: [],
          },
          {
            id: '41',
            name: 'file 28',
            variant: 'file',
            nodes: [],
          },
        ],
      },
      {
        id: '42',
        name: 'file 29',
        variant: 'file',
        nodes: [],
      },
      {
        id: '43',
        name: 'file 30',
        variant: 'file',
        nodes: [],
      },
      {
        id: '44',
        name: 'file 31',
        variant: 'file',
        nodes: [],
      },
      {
        id: '45',
        name: 'folder 14',
        variant: 'folder',
        nodes: [
          {
            id: '46',
            name: 'file 32',
            variant: 'file',
            nodes: [],
          },
          {
            id: '47',
            name: 'file 33',
            variant: 'file',
            nodes: [],
          },
          {
            id: '48',
            name: 'file 34',
            variant: 'file',
            nodes: [],
          },
        ],
      },
      {
        id: '49',
        name: 'folder 15',
        variant: 'folder',
        nodes: [
          {
            id: '50',
            name: 'file 35',
            variant: 'file',
            nodes: [],
          },
          {
            id: '51',
            name: 'file 36',
            variant: 'file',
            nodes: [],
          },
          {
            id: '52',
            name: 'file 37',
            variant: 'file',
            nodes: [],
          },
        ],
      },
    ],
  },
  {
    id: '53',
    name: 'file 38',
    variant: 'file',
    nodes: [
      {
        id: '54',
        name: 'file 39',
        variant: 'file',
        nodes: [],
      },
      {
        id: '55',
        name: 'file 40',
        variant: 'file',
        nodes: [],
      },
    ],
  },
]
