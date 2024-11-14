//writebackPayloadLoadTest
const protobuf = require("protobufjs");
const axios = require("axios");
const { FormData, Blob } = require("formdata-node");
const snappy = require("snappyjs");

const url = "https://integration.inforiver.com/v3/export/visual/";
const accessToken ="ACCESS_TOKEN_HERE";
const visualSample = [
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 558.3400000000009,
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "Central__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Central_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 39706.3625,
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "Central__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Central_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 413.9999999999998,
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "East__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "East_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 91522.78,
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "East__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "East_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 238.54999999999998,
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "South__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "South_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 46749.4303,
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "South__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "South_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 350.2000000000004,
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "West__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "West_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 108418.44889999999,
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "West__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "West_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 1561.090000000001,
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "Grand__Total__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 286397.02170000004,
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Grand__Total",
        "columnId": "Grand__Total__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 359.40000000000117,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "Central__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Central_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 8879.9799,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "Central__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Central_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 244.7,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "East__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "East_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 41014.5791,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "East__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "East_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 166.6,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "South__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "South_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 19986.3928,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "South__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "South_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 177.1,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "West__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "West_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 52609.849,
      "Superstore 2023.Category": "Office Supplies",
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Office__Supplies",
        "columnId": "West__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "West_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 947.8000000000011,
      "Superstore 2023.Category": "Office Supplies",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Office__Supplies",
        "columnId": "Grand__Total__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 122490.80080000001,
      "Superstore 2023.Category": "Office Supplies",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Office__Supplies",
        "columnId": "Grand__Total__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 143.03999999999985,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "Central__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Central_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": -2871.0494,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "Central__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Central_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 92.5999999999998,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "East__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "East_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 3046.1658,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "East__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "East_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 40.34999999999999,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "South__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "South_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 6771.2061,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "South__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "South_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 92.90000000000033,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "West__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "West_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 11504.9503,
      "Superstore 2023.Category": "Furniture",
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Furniture",
        "columnId": "West__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "West_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 368.89,
      "Superstore 2023.Category": "Furniture",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Furniture",
        "columnId": "Grand__Total__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 18451.2728,
      "Superstore 2023.Category": "Furniture",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Furniture",
        "columnId": "Grand__Total__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 55.89999999999997,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "Central__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Central_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 33697.432,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "Central",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "Central__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Central_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 76.70000000000002,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "East__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "East_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 47462.0351,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "East",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "East__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "East_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 31.6,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "South__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "South_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 19991.8314,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "South",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "South__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "South_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 80.20000000000003,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "West__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "West_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 44303.6496,
      "Superstore 2023.Category": "Technology",
      "Superstore 2023.Region": "West",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": false,
        "rowId": "Technology",
        "columnId": "West__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "West_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": 244.40000000000003,
      "Superstore 2023.Category": "Technology",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Technology",
        "columnId": "Grand__Total__Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__",
        "isNull": false
      }
    },
    {
      "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": 145454.9481,
      "Superstore 2023.Category": "Technology",
      "_cellMeta": {
        "measureGuid": "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "source": "Native",
        "scenarioId": "0",
        "isAggregated": true,
        "rowId": "Technology",
        "columnId": "Grand__Total__Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "columnName": "Grand__Total_X_Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__",
        "isNull": false
      }
    }
  ];

const schema =  {
    "nested": {
      "Data": {
        "fields": {
          "Sum__Superstore__2023__Discount__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLkRpc2NvdW50KQ__": {
            "type": "double",
            "id": 1
          },
          "Sum__Superstore__2023__Profit__U3VtKFN1cGVyc3RvcmUlMjAyMDIzLlByb2ZpdCk__": {
            "type": "double",
            "id": 2
          },
          "Superstore 2023.Category": {
            "type": "string",
            "id": 3
          },
          "Superstore 2023.Region": {
            "type": "string",
            "id": 4
          },
          "_cellMeta": {
            "type": "CellMeta",
            "id": 5
          },
          "Ir Notes": {
            "type": "string",
            "id": 6
          },
          "Last Updated At": {
            "type": "double",
            "id": 7
          },
          "Last Updated By": {
            "type": "string",
            "id": 8
          }
        }
      },
      "CellMeta": {
        "fields": {
          "measureGuid": {
            "type": "string",
            "id": 1
          },
          "source": {
            "type": "string",
            "id": 2
          },
          "scenarioId": {
            "type": "string",
            "id": 3
          },
          "isAggregated": {
            "type": "bool",
            "id": 4
          },
          "isPartOfAllocationRange": {
            "type": "bool",
            "id": 5
          },
          "rowId": {
            "type": "string",
            "id": 6
          },
          "columnId": {
            "type": "string",
            "id": 7
          },
          "columnName": {
            "type": "string",
            "id": 8
          },
          "isNull": {
            "type": "bool",
            "id": 9
          }
        }
      },
      "Payload": {
        "fields": {
          "data": {
            "rule": "repeated",
            "type": "Data",
            "id": 10
          }
        }
      }
    }
  }; 

const payloadData = {
  writebackEnvironment: "Service",
  writebackMode: "Mg==",
  scenarioIds: ["0"],
  compressionVersion: 1,
  sourceType: 10,
  visualFilter: 20,
  filterContextHash: null
};

const logWithTime = (message, startTime) => {
  const currentTime = new Date().toISOString();
  const elapsedTime = Date.now() - startTime;
  console.log(`[${currentTime.toLocaleString()}] [Execution Time: ${elapsedTime} ms] ${message}`);
};

// Function to generate sample data
const generateData = (data, targetCount) => {
  const rowDimension = "Superstore 2023.Category";
  const rowDimensionMember = "Technology";
  const sampleRow = data.filter(datum => datum[rowDimension] === rowDimensionMember);
  let numCopies = 0;

  while (data.length < targetCount) {
    numCopies++;
    const newRow = sampleRow.map(cell => {
      const cellCopy = { ...cell, [rowDimension]: `${rowDimensionMember}_copy_${numCopies}` };
      cellCopy._cellMeta.rowId = cellCopy[rowDimension];
      return cellCopy;
    });
    data.push(...newRow);
  }
  return data;
};

const encodeAsProtobuf = (schema, payload) => {
  const root = protobuf.Root.fromJSON(schema);
  const PayloadMessage = root.lookupType("Payload");
  const errorMessage = PayloadMessage.verify(payload);
  if (errorMessage) throw new Error(errorMessage);
  return PayloadMessage.encode(payload).finish();
};

const sendWritebackPayload = async () => {
  const functionStartTime = Date.now();
  logWithTime(`Info: Execution started`, functionStartTime);

  try {
    // Step 1: Generate the data
    const data = generateData(visualSample, 3800000);
    payloadData['incomingJsonDataLength'] = data.length;
    logWithTime(`Info: Successfully generated ${data.length} records`, functionStartTime);
    
    // Step 2: Encode and compress the data
    const encodedData = encodeAsProtobuf(schema, { data });
    logWithTime(`Info: Data successfully serialized`, functionStartTime);
    const compressedData = snappy.compress(encodedData);
    logWithTime(`Info: Data successfully compressed`, functionStartTime);

    // Step 3: Prepare form data and send it
    const formData = new FormData();
    formData.append("schema", JSON.stringify(schema));
    formData.append("payload", JSON.stringify(payloadData));
    formData.append("writebackPayload", new Blob([compressedData], { type: "application/octet-stream" }), {
      contentType: "application/octet-stream"
    });
    console.log(`Info: Payload framed, hitting the API`);

    const startTime = Date.now();
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const endTime = Date.now();
    console.log(`Info: Response received in ${endTime - startTime} ms`);
    console.dir(response.data);
  } catch (error) {
    console.error("Error:", error);
  }

  const functionEndTime = Date.now();
  console.log(`Info: Total function execution time: ${functionEndTime - functionStartTime} ms`);
};

sendWritebackPayload();
