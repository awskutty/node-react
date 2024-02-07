export const table = {
    Entities: [
      {
        isHeader: "tname",
        tname: "User",
  
        columns: [
        
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "userName",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "email",
  
            datatype: "String",
  
            contraints: "@unique",
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
  
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Profile",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "bio",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "@unique",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    y: "?",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Post",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "createdAt",
  
            datatype: "DateTime",
  
            contraints: "@default(now())",
          },
  
          {
            cname: "updatedAt",
  
            datatype: "DateTime",
  
            contraints: "@updatedAt",
          },
  
          {
            cname: "title",
  
            datatype: "String",
  
            contraints: "@db.VarChar(255)",
          },
  
          {
            cname: "content",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "published",
  
            datatype: "Boolean",
  
            contraints: "@default(false)",
          },
  
          {
            cname: "authorId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                    nObject: {
                      foo: "bar",
                    },
                  },
                  {
                    N: "[]",
                    nObject1: {},
                    nArray: [],
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
      {
        helo: "hai",
      },
  
      {
        isHeader: "tname",
        tname: "Topic",
  
        columns: [
          {
            isHeader: "cname",
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            isHeader: "cname",
            cname: "name",
  
            datatype: "String",
  
            contraints: "",
          },
  
          {
            isHeader: "cname",
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    isHeader: "N",
                    N: "[]",
                  },
                ],
              },
            ],
          },
  
          {
            isHeader: "cname",
            cname: "postId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                isHeader: "parent",
                parent: "Post",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    isHeader: "N",
                    N: "[]",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
    ],
    Ent2: [
      {
        isHeader: "tname",
        tname: "User",
  
        columns: [
          {
            isHeader: "cname",
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "userName",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "email",
  
            datatype: "String",
  
            contraints: "@unique",
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
  
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Profile",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "bio",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "@unique",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    y: "?",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Post",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "createdAt",
  
            datatype: "DateTime",
  
            contraints: "@default(now())",
          },
  
          {
            cname: "updatedAt",
  
            datatype: "DateTime",
  
            contraints: "@updatedAt",
          },
  
          {
            cname: "title",
  
            datatype: "String",
  
            contraints: "@db.VarChar(255)",
          },
  
          {
            cname: "content",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "published",
  
            datatype: "Boolean",
  
            contraints: "@default(false)",
          },
  
          {
            cname: "authorId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                    nObject: {
                      foo: "bar",
                    },
                  },
                  {
                    N: "[]",
                    nObject1: {},
                    nArray: [],
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
      {
        helo: "hai",
      },
  
      {
        isHeader: "tname",
        tname: "Topic",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "name",
  
            datatype: "String",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
  
          {
            cname: "postId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "Post",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
    ],
    Ent3: [
      {
        isHeader: "tname",
        tname: "User",
  
        columns: [
          {
            isHeader: "cname",
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "userName",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "email",
  
            datatype: "String",
  
            contraints: "@unique",
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
  
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Profile",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "bio",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "@unique",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    y: "?",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Post",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "createdAt",
  
            datatype: "DateTime",
  
            contraints: "@default(now())",
          },
  
          {
            cname: "updatedAt",
  
            datatype: "DateTime",
  
            contraints: "@updatedAt",
          },
  
          {
            cname: "title",
  
            datatype: "String",
  
            contraints: "@db.VarChar(255)",
          },
  
          {
            cname: "content",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "published",
  
            datatype: "Boolean",
  
            contraints: "@default(false)",
          },
  
          {
            cname: "authorId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                    nObject: {
                      foo: "bar",
                    },
                  },
                  {
                    N: "[]",
                    nObject1: {},
                    nArray: [],
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
      {
        helo: "hai",
      },
  
      {
        isHeader: "tname",
        tname: "Topic",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "name",
  
            datatype: "String",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
  
          {
            cname: "postId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "Post",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
    ],
    Ent4: [
      {
        isHeader: "tname",
        tname: "User",
  
        columns: [
          {
            isHeader: "cname",
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "userName",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "email",
  
            datatype: "String",
  
            contraints: "@unique",
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
  
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Profile",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "bio",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "@unique",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    y: "?",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Post",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "createdAt",
  
            datatype: "DateTime",
  
            contraints: "@default(now())",
          },
  
          {
            cname: "updatedAt",
  
            datatype: "DateTime",
  
            contraints: "@updatedAt",
          },
  
          {
            cname: "title",
  
            datatype: "String",
  
            contraints: "@db.VarChar(255)",
          },
  
          {
            cname: "content",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "published",
  
            datatype: "Boolean",
  
            contraints: "@default(false)",
          },
  
          {
            cname: "authorId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                    nObject: {
                      foo: "bar",
                    },
                  },
                  {
                    N: "[]",
                    nObject1: {},
                    nArray: [],
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
      {
        helo: "hai",
      },
  
      {
        isHeader: "tname",
        tname: "Topic",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "name",
  
            datatype: "String",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
  
          {
            cname: "postId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "Post",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
    ],
    Ent5: [
      {
        isHeader: "tname",
        tname: "User",
  
        columns: [
          {
            isHeader: "cname",
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "userName",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "email",
  
            datatype: "String",
  
            contraints: "@unique",
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
  
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "email",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userName",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Profile",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
          },
  
          {
            cname: "bio",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "@unique",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    y: "?",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "bio",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
          },
        ],
      },
  
      {
        isHeader: "tname",
        tname: "Post",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "createdAt",
  
            datatype: "DateTime",
  
            contraints: "@default(now())",
          },
  
          {
            cname: "updatedAt",
  
            datatype: "DateTime",
  
            contraints: "@updatedAt",
          },
  
          {
            cname: "title",
  
            datatype: "String",
  
            contraints: "@db.VarChar(255)",
          },
  
          {
            cname: "content",
  
            datatype: "String?",
  
            contraints: "",
          },
  
          {
            cname: "published",
  
            datatype: "Boolean",
  
            contraints: "@default(false)",
          },
  
          {
            cname: "authorId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                    nObject: {
                      foo: "bar",
                    },
                  },
                  {
                    N: "[]",
                    nObject1: {},
                    nArray: [],
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "authorId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "title",
  
                datatype: "String",
              },
  
              {
                key: "content",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
      {
        helo: "hai",
      },
  
      {
        isHeader: "tname",
        tname: "Topic",
  
        columns: [
          {
            cname: "id",
  
            datatype: "Int",
  
            contraints: "@id @default(autoincrement())",
  
            relationship: "",
          },
  
          {
            cname: "name",
  
            datatype: "String",
  
            contraints: "",
          },
  
          {
            cname: "userId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "User",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
  
          {
            cname: "postId",
  
            datatype: "Int",
  
            contraints: "",
  
            relationship: [
              {
                parent: "Post",
  
                parentColumn: "id",
  
                isOptional: [
                  {
                    N: "[]",
                  },
                ],
              },
            ],
          },
        ],
  
        methods: [
          {
            methodName: "GetALL",
  
            conditionparams: [],
          },
  
          {
            methodName: "Get",
  
            QueryConditions: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
  
            QueryParams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Post",
  
            conditionparams: [],
          },
  
          {
            methodName: "Put",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "userId",
  
                datatype: "Int",
              },
            ],
  
            QueryParams: [
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
  
          {
            methodName: "Delete",
  
            conditionparams: [
              {
                key: "id",
  
                datatype: "Int",
              },
  
              {
                key: "name",
  
                datatype: "String",
              },
            ],
          },
        ],
      },
    ],
  };
  