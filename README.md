
# PCF Form Json
A PCF Component that receives a predefined JSON format string and displays it as a Bootstrap Form. Then, Users can interact with the form and can save the value as a JSON format value.

![PCF Form Json](https://temmyraharjo.files.wordpress.com/2021/04/demo-pcf-form.gif)
## Sample JSON Form string

```javascript
{
    "controls": [{
            "name": "name",
            "label": "Name",
            "type": "string"
        },
        {
            "name": "total",
            "label": "Total Amount",
            "type": "number"
        },
        {
            "name": "active",
            "label": "Active",
            "type": "boolean"
        },
        {
            "name": "account",
            "label": "Account",
            "type": "lookup"
        }
    ],
    "lookupMetadata": {
        "account": {
            "allowMultiSelect": true,
            "defaultEntityType": "account",
            "defaultViewId": "",
            "entityTypes": ["account", "contact"],
            "viewIds": []
        }
    }
}
```

Supported data types: 
- String with type: 'string'
- Lookup with type: 'lookup'
- Number with type: 'number'
- Boolean with type: 'boolean'

## Sample JSON Result
```javascript
{
    "name": "Temmy Wahyu Raharjo",
    "total": 1000,
    "active": true,
    "account": [{
        "id": "96EF3EA2-2B77-E511-80DB-00155DFD1F02",
        "etn": "account",
        "name": "Temmy Wahyu Raharjo"
    }]
}
```